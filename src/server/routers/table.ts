import { prisma } from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import { privateProcedure, router } from '../trpc';

const tableRouter = router({
  getTableMPP: privateProcedure.query(async () => {
    const session = await getServerSession(authOptions);
    const table = await prisma.mPP.findMany({
      where: {
        userId: session?.user?.id,
      },
      select: {
        MPP: true,
        id: true,
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
      },
    });
    return table;
  }),
});

export default tableRouter;
