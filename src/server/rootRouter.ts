import { tableRouter, adminRouter, userRouter } from '@/server/routes';
import { router } from './trpc';

export const appRouter = router({
  tableRouter,
  adminRouter,
  userRouter,
});
export type AppRouter = typeof appRouter;
