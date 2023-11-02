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

  getMonthlyMPPGap: privateProcedure
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
      const MPPGap = await prisma.mPP.findMany({
        where: {
          AND: [
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

  getUsers: privateProcedure.query(async () => {
    const users = await prisma.user.findMany({
      where: {
        role: {
          notIn: ['ADMIN', 'SUPER'],
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        Org_Group_Name: true,
      },
    });
    return users;
  }),

  addUser: privateProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        role: z.enum(['USER', 'ADMIN', 'SUPER']),
        OrgGroupName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          role: input.role,
          Org_Group_Name: input.OrgGroupName,
        },
      });
      return user;
    }),

  deleteUser: privateProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.delete({
        where: {
          email: input.email,
        },
      });
      return user;
    }),

  editUser: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        role: z.enum(['USER', 'ADMIN', 'SUPER']),
        OrgGroupName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          role: input.role,
          Org_Group_Name: input.OrgGroupName,
        },
      });
      return user;
    }),
});

export default adminRouter;
