import { AppRouter } from '@/server/rootRouter';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>({});
