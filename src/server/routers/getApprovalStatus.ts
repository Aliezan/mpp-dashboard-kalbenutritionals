import { prisma } from '@/db';
import { privateProcedure, router } from '../trpc';

const getApprovalStatus = router({
  getApprovalStatus: privateProcedure.query(async () => {
    const res = await prisma.mPP.count({
      where: {
        OR: [
          {
            isApproved: 'APPROVED',
          },
          {
            isApproved: 'PENDING',
          },
        ],
      },
    });

    return res;
  }),
});

export default getApprovalStatus;
