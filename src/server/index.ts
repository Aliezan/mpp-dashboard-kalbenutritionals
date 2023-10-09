import { router } from './trpc';
import { tableRouter } from './routers/table';

export const appRouter = router({
  tableRouter,
});
export type AppRouter = typeof appRouter;
