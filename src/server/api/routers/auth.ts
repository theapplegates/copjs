import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

// Auth Router
export const authRouter = createTRPCRouter({
  checkCredentials: publicProcedure
    .input(
      z.object({
        email: z.string().email().max(100),
        password: z.string().min(6).max(100)
      })
    )
    .query(async ({ input }) => {
      const { email, password } = input;

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

      if (user && user.password === password) {
        return user;
      }

      return null;
    }),
  requestLink: publicProcedure
    .input(
      z.object({
        email: z.string().email().max(100)
      })
    )
    .mutation(async ({ input }) => {
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
