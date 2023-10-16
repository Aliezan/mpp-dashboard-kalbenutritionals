import { prisma } from '@/db';
import { privateProcedure, router } from '../trpc';

const adminRouter = router({
  MPPStatus: privateProcedure.query(async () => {
    const approvedCount = await prisma.mPP.count({
      where: {
        isApproved: 'APPROVED',
      },
    });

    const rejectedCount = await prisma.mPP.count({
      where: {
        isApproved: 'REJECTED',
      },
    });

    const pendingCount = await prisma.mPP.count({
      where: {
        isApproved: 'PENDING',
      },
    });

    return {
      approvedCount,
      rejectedCount,
      pendingCount,
    };
  }),
});

export default adminRouter;
