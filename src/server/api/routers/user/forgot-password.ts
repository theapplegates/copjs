import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { createTRPCRouter, publicProcedure } from '../../trpc';

export const ForgotPasswordInput = z.object({
  email: z.string().email().max(100)
});

export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordInput>;

export const userForgotPasswordRouter = createTRPCRouter({
  requestLink: publicProcedure
    .input(ForgotPasswordInput)
    .mutation(async ({ input }: { input: ForgotPasswordInputType }) => {
      const { email } = input;

      const user = await prisma.user.findFirst({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          password: true,
          createdAt: true,
          updatedAt: true,
          emailVerified: true,
          role: true
        }
      });

      await prisma.$disconnect();

      if (user) {
        return user;
      }

      return null;
    })
});
