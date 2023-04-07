import { authRouter } from '@/server/api/routers/auth';
import { buildRouter } from '@/server/api/routers/build';
import { userRouter } from '@/server/api/routers/user';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  build: buildRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
