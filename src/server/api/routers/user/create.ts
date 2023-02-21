import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/utils/hash';

import { createTRPCRouter, publicProcedure } from '../../trpc';

export const CreateUserInput = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().max(100),
  password: z.string().min(6).max(100)
});

export type CreateUserInputType = z.infer<typeof CreateUserInput>;

export const userCreateRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateUserInput)
    .mutation(async ({ input }: { input: CreateUserInputType }) => {
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
    })
});
