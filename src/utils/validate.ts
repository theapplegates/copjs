import { z } from 'zod';

export const zValidator = {
  id: z
    .string({
      invalid_type_error: 'Invalid user ID.',
      required_error: 'User ID is required.'
    })
    .min(1, {
      message: 'User ID must be at least 1 character.'
    })
    .max(255, {
      message: 'User ID must be less than 255 characters.'
    }),

  name: z
    .string({
      invalid_type_error: 'Invalid display name.',
      required_error: 'Display name is required.'
    })
    .min(3, {
      message: 'Display name must be at least 3 characters.'
    })
    .max(100, {
      message: 'Display name must be less than 100 characters.'
    }),

  email: z
    .string({
      invalid_type_error: 'Invalid email address.',
      required_error: 'Email is required.'
    })
    .email({
      message: 'Invalid email address.'
    })
    .max(100, {
      message: 'Email must be less than 100 characters.'
    }),

  password: z
    .string({
      invalid_type_error: 'Invalid password.',
      required_error: 'Password is required.'
    })
    .min(6, {
      message: 'Password must be at least 6 characters.'
    })
    .max(100, {
      message: 'Password must be less than 100 characters.'
    })
};
