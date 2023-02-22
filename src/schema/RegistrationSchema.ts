import { z } from 'zod';

export default z
  .object({
    name: z.string().min(3).max(100),
    email: z.string().email().max(100),
    password: z.string().min(6).max(100),
    passwordConfirm: z.string().min(6).max(100)
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Passwords do not match.',
    path: ['passwordConfirm']
  });
