import { userRouter } from './routers/user';
import { userCheckCredentialsRouter } from './routers/user/check-credentials';
import { userCreateRouter } from './routers/user/create';
import { userForgotPasswordRouter } from './routers/user/forgot-password';
import { createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  userCheckCredentials: userCheckCredentialsRouter,
  userCreate: userCreateRouter,
  forgotPassword: userForgotPasswordRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
