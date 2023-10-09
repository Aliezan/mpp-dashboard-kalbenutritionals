import { TRPCError, initTRPC } from '@trpc/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

const t = initTRPC.create();
const { middleware } = t;

const isAuth = middleware(async (opts) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      userId: session.user.id,
      session,
    },
  });
});

export const { router } = t;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
