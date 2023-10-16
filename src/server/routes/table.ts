import { prisma } from '@/db';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

const tableRouter = router({
  getMPP: privateProcedure.query(async ({ ctx }) => {
    const table = await prisma.mPP.findMany({
      where: {
        userId: ctx.userId,
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
    return table;
  }),
  getMPPGap: privateProcedure.query(async ({ ctx }) => {
    const MPPGap = await prisma.deficitMPP.findMany({
      where: {
        userId: ctx.userId,
      },
      select: {
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
