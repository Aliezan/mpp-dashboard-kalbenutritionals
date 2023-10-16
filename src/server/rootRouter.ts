import { tableRouter, adminRouter } from '@/server/routes';
import { router } from './trpc';

export const appRouter = router({
  tableRouter,
  adminRouter,
});
export type AppRouter = typeof appRouter;
