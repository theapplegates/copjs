import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc';

import { zValidator } from '@/utils/validate';

// User Router
export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z
        .object({
          name: zValidator.name,
          email: zValidator.email,
          password: zValidator.password,
          passwordConfirm: zValidator.password
        })
        .refine(data => data.password === data.passwordConfirm, {
          message: 'Passwords do not match.',
          path: ['passwordConfirm']
        })
    )
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password
        }
      });

      await prisma.$disconnect();

      return user;
    }),

  get: protectedProcedure
    .input(
      z.object({
        id: zValidator.id
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
        id: zValidator.id,
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
        id: zValidator.id
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
