import { prisma } from '@/db';
import { privateProcedure, router } from '../trpc';

const userRouter = router({
  getCurrentUserOrg: privateProcedure.query(async ({ ctx }) => {
    const getOrgName = await prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
      select: {
        Org_Group_Name: true,
      },
    });
    return getOrgName;
  }),
});

export default userRouter;
