import { tableRouter, approvalRouter } from '@/server/routers';
import { router } from './trpc';

export const appRouter = router({
  tableRouter,
  approvalRouter,
});
export type AppRouter = typeof appRouter;
