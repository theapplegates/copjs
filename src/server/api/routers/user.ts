import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc';

import { hashPassword } from '@/utils/hash';

// User Router
export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(3).max(100),
        email: z.string().email().max(100),
        password: z.string().min(6).max(100)
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      const hashedPassword = hashPassword(password);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

      await prisma.$disconnect();

      return user;
    }),

  get: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1).max(255)
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      const user = await prisma.user.findFirst({
        where: { id }
      });

      await prisma.$disconnect();

      return user || null;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1).max(255),
        data: z.record(z.any())
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      const user = await prisma.user.update({
        where: { id },
        data
      });

      await prisma.$disconnect();

      return user || null;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1).max(255)
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      await prisma.user.delete({
        where: { id }
      });

      await prisma.$disconnect();

      return true;
    })
});
