import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { createTRPCRouter, protectedProcedure } from '../../trpc';

// Get User Input
export const GetUserInput = z.object({
  id: z.string().min(1).max(255)
});

export type GetUserInputType = z.infer<typeof GetUserInput>;

// Update User Input
export const UpdateUserInput = z.object({
  id: z.string().min(1).max(255),
  data: z.record(z.any())
});

export type UpdateUserInputType = z.infer<typeof UpdateUserInput>;

// Delete User Input
export const DeleteUserInput = z.object({
  id: z.string().min(1).max(255)
});

type DeleteUserInputType = z.infer<typeof DeleteUserInput>;

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(GetUserInput)
    .mutation(async ({ input }: { input: GetUserInputType }) => {
      const { id } = input;

      const user = await prisma.user.findFirst({
        where: { id }
      });

      await prisma.$disconnect();

      return user || null;
    }),

  updateUser: protectedProcedure
    .input(UpdateUserInput)
    .mutation(async ({ input }: { input: UpdateUserInputType }) => {
      const { id, ...data } = input;

      const user = await prisma.user.update({
        where: { id },
        data
      });

      await prisma.$disconnect();

      return user || null;
    }),

  deleteUser: protectedProcedure
    .input(DeleteUserInput)
    .mutation(async ({ input }: { input: DeleteUserInputType }) => {
      const { id } = input;

      await prisma.user.delete({
        where: { id }
      });

      await prisma.$disconnect();

      return true;
    })
});
