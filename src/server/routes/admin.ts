/* eslint-disable no-underscore-dangle */
import { prisma } from '@/db';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

const adminRouter = router({
  MPPStatus: privateProcedure.query(async () => {
    const counts = await prisma.mPP.groupBy({
      by: ['isApproved'],
      _count: {
        isApproved: true,
      },
    });

    const approvedCount =
      counts.find((c) => c.isApproved === 'APPROVED')?._count ?? 0;
    const rejectedCount =
      counts.find((c) => c.isApproved === 'REJECTED')?._count ?? 0;
    const pendingCount =
      counts.find((c) => c.isApproved === 'PENDING')?._count ?? 0;

    return {
      approvedCount,
      rejectedCount,
      pendingCount,
    };
  }),

  insertMPP: privateProcedure
    .input(
      z.array(
        z.object({
          Employee_ID: z.string().nullable(),
          Employee_Name: z.string().nullable(),
          Join_Date: z.string().nullable(),
          Job_Title_Name: z.string().nullable(),
          Org_Group_Name: z.string().nullable(),
          Job_Level_Code: z.string().nullable(),
          Category: z.string().nullable(),
          Status: z.string().nullable(),
          MPP: z.string().nullable(),
          Actual: z.string().nullable(),
          Gap: z.string().nullable(),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      const inputMPP = await prisma.mPP.createMany({
        data: input,
      });

      return inputMPP.count;
    }),

  getMPPGap: privateProcedure.query(async () => {
    const MPPGap = await prisma.mPP.findMany({
      where: {
        Gap: '-1',
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

  getMonthlyMPP: privateProcedure
    .input(
      z.object({
        month: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const currentYear = new Date().getFullYear();
      const date = new Date(Date.parse(`${input.month} 1, ${currentYear}`));
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
      );

      const MonthlyMPP = await prisma.mPP.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth,
              },
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
      return MonthlyMPP;
    }),
});

export default adminRouter;
