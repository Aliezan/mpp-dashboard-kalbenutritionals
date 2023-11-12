import { prisma } from '@/db';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

const tableRouter = router({
  getMonthlyMPPUser: privateProcedure
    .input(
      z.object({
        month: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const currentYear = new Date().getFullYear();
      const date = new Date(Date.parse(`${input.month} 1, ${currentYear}`));
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
      );

      const MonthlyMPPUser = await prisma.mPP.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth,
              },
            },
            {
              userId: ctx.userId,
            },
            {
              Gap: {
                not: '-1',
              },
            },
          ],
        },
        select: {
          MPP: true,
          Employee_ID: true,
          Employee_Name: true,
          Join_Date: true,
          Job_Title_Name: true,
          Org_Group_Name: true,
          Job_Level_Code: true,
          Category: true,
          Status: true,
          Actual: true,
          Gap: true,
          isApproved: true,
        },
      });
      return MonthlyMPPUser;
    }),
  getMonthlyMPPGapUser: privateProcedure
    .input(
      z.object({
        month: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const currentYear = new Date().getFullYear();
      const date = new Date(Date.parse(`${input.month} 1, ${currentYear}`));
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
      );
      const MPPGap = await prisma.mPP.findMany({
        where: {
          AND: [
            {
              userId: ctx.userId,
            },
            {
              createdAt: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth,
              },
            },
            {
              Gap: '-1',
            },
          ],
        },
        select: {
          id: true,
          Org_Group_Name: true,
          Job_Title_Name: true,
          Job_Level_Code: true,
          Category: true,
          Status: true,
          MPP: true,
          Actual: true,
          Gap: true,
        },
      });
      return MPPGap;
    }),
  approveMPP: privateProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateApproval = await prisma.mPP.updateMany({
        where: {
          AND: [
            {
              userId: ctx.userId,
            },
            {
              Employee_ID: {
                in: input.ids,
              },
            },
          ],
        },
        data: {
          isApproved: 'APPROVED',
        },
      });
      return updateApproval;
    }),

  rejectMPP: privateProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const rejectApproval = await prisma.mPP.updateMany({
        where: {
          AND: [
            {
              userId: ctx.userId,
            },
            {
              Employee_ID: {
                in: input.ids,
              },
            },
          ],
        },
        data: {
          isApproved: 'REJECTED',
        },
      });
      return rejectApproval;
    }),
});

export default tableRouter;
