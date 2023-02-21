import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { createTRPCRouter, publicProcedure } from '../../trpc';

export const CheckCredentialsInput = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(100)
});

export type CheckCredentialsInputType = z.infer<typeof CheckCredentialsInput>;

export const userCheckCredentialsRouter = createTRPCRouter({
  checkCredentials: publicProcedure
    .input(CheckCredentialsInput)
    .query(async ({ input }: { input: CheckCredentialsInputType }) => {
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
    })
});
