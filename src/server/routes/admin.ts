/* eslint-disable no-underscore-dangle */
import { prisma } from '@/db';
import { Status } from '@prisma/client';
import { z } from 'zod';
import MPPRelations from '@/utils/MPPRelations';
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
    // *TODO: ASK SHOULD ALL MPP ARE APPROVED OR PENDING BY DEFAULT?
    .mutation(async ({ input }) => {
      const modifiedInput = input.map((item) => ({
        ...item,
        isApproved: item.Gap === '0' ? Status.APPROVED : Status.PENDING,
      }));
      const inputMPP = await prisma.mPP.createMany({
        data: modifiedInput,
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
          id: true,
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
          createdAt: true,
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

      await MPPRelations(input.OrgGroupName, user.id);
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
      await MPPRelations(input.OrgGroupName, user.id);
      return user;
    }),
  getOrgMPP: privateProcedure.query(async () => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;

    const OrgMPP = await prisma.mPP.findMany({
      select: {
        id: true,
        Org_Group_Name: true,
      },
      where: {
        createdAt: {
          gte: new Date(date.getFullYear(), currentMonth - 1, 1),
          lt: new Date(date.getFullYear(), currentMonth, 1),
        },
      },
      distinct: ['Org_Group_Name'],
    });

    return OrgMPP;
  }),
  editMPP: privateProcedure
    .input(
      z.object({
        id: z.string(),
        Employee_ID: z.string(),
        Employee_Name: z.string(),
        Join_Date: z.string(),
        Job_Title_Name: z.string(),
        Job_Level_Code: z.string(),
        Category: z.string(),
        Status: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const updateMPP = await prisma.mPP.update({
        where: {
          id: input.id,
        },
        data: {
          Employee_ID: input.Employee_ID,
          Employee_Name: input.Employee_Name,
          Join_Date: input.Join_Date,
          Job_Title_Name: input.Job_Title_Name,
          Job_Level_Code: input.Job_Level_Code,
          Category: input.Category,
          Status: input.Status,
        },
      });
      return updateMPP;
    }),
  editMPPOrg: privateProcedure
    .input(
      z.object({
        id: z.string(),
        Employee_ID: z.string(),
        Employee_Name: z.string(),
        Org_Group_Name: z.string(),
        Join_Date: z.string(),
        Job_Title_Name: z.string(),
        Job_Level_Code: z.string(),
        Category: z.string(),
        Status: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const deleteExistingMPP = await prisma.mPP.delete({
        where: {
          id: input.id,
        },
      });

      const moveToNewOrg = await prisma.mPP.create({
        data: {
          Employee_ID: input.Employee_ID,
          Employee_Name: input.Employee_Name,
          Join_Date: input.Join_Date,
          Org_Group_Name: input.Org_Group_Name,
          Job_Title_Name: input.Job_Title_Name,
          Job_Level_Code: input.Job_Level_Code,
          Category: input.Category,
          Status: input.Status,
        },
      });

      const user = await prisma.user.findFirst({
        where: { Org_Group_Name: input.Org_Group_Name },
      });

      if (user) {
        await MPPRelations(input.Org_Group_Name, user.id);
      }

      return {
        deleteExistingMPP,
        moveToNewOrg,
      };
    }),
  addMPPGap: privateProcedure
    .input(
      z.object({
        Org_Group_Name: z.string(),
        Job_Title_Name: z.string(),
        Job_Level_Code: z.string(),
        Category: z.string(),
        Status: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const addMPPGap = await prisma.mPP.create({
        data: {
          Org_Group_Name: input.Org_Group_Name,
          Job_Title_Name: input.Job_Title_Name,
          Job_Level_Code: input.Job_Level_Code,
          Category: input.Category,
          Status: input.Status,
          MPP: '1',
          Actual: '0',
          Gap: '-1',
        },
      });

      const user = await prisma.user.findFirst({
        where: { Org_Group_Name: input.Org_Group_Name },
      });

      if (user) {
        await MPPRelations(input.Org_Group_Name, user.id);
      }
      return addMPPGap;
    }),
  assignMPPGap: privateProcedure
    .input(
      z.object({
        id: z.string(),
        Employee_ID: z.string(),
        Employee_Name: z.string(),
        Join_Date: z.string(),
        Status: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const assignMPPGap = await prisma.mPP.update({
        where: {
          id: input.id,
        },
        data: {
          Employee_ID: input.Employee_ID,
          Employee_Name: input.Employee_Name,
          Join_Date: input.Join_Date,
          Status: input.Status,
          Gap: '0',
          Actual: '1',
        },
      });
      const mpp = await prisma.mPP.findUnique({
        where: { id: input.id },
      });

      if (mpp) {
        const user = await prisma.user.findFirst({
          where: { Org_Group_Name: mpp.Org_Group_Name },
        });

        if (user) {
          await MPPRelations(mpp.Org_Group_Name ?? '', user.id);
        }
      }
      return assignMPPGap;
    }),
  deleteMPPRow: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const deleteMPPRow = await prisma.mPP.delete({
        where: {
          id: input.id,
        },
      });
      return deleteMPPRow;
    }),
  addMPPRow: privateProcedure
    .input(
      z.object({
        Employee_ID: z.string(),
        Employee_Name: z.string(),
        Join_Date: z.string(),
        Org_Group_Name: z.string(),
        Job_Title_Name: z.string(),
        Job_Level_Code: z.string(),
        Category: z.string(),
        Status: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const createMPPRow = await prisma.mPP.create({
        data: {
          Employee_ID: input.Employee_ID,
          Employee_Name: input.Employee_Name,
          Join_Date: input.Join_Date,
          Org_Group_Name: input.Org_Group_Name,
          Job_Title_Name: input.Job_Title_Name,
          Job_Level_Code: input.Job_Level_Code,
          Category: input.Category,
          Status: input.Status,
          MPP: '1',
          Actual: '0',
          Gap: '1',
        },
      });

      const user = await prisma.user.findFirst({
        where: { Org_Group_Name: input.Org_Group_Name },
      });

      if (user) {
        await MPPRelations(input.Org_Group_Name, user.id);
      }
      return createMPPRow;
    }),
  getCurrentMonthCategory: privateProcedure
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
      const MPPCategories = await prisma.mPP.findMany({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
        select: {
          id: true,
          Category: true,
        },
        distinct: ['Category'],
      });
      return MPPCategories;
    }),
  getTableDataByCategory: privateProcedure
    .input(
      z.object({
        category: z.string(),
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

      const getData = await prisma.mPP.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth,
              },
            },
            {
              Category: input.category,
            },
            {
              Gap: '-1',
            },
          ],
        },
        select: {
          Job_Title_Name: true,
          Status: true,
          Category: true,
        },
      });
      return getData;
    }),
});

export default adminRouter;
