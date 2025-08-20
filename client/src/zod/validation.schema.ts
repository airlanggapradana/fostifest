import {z} from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const registerSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
  institusi: z.string().min(1, 'Institution is required'),
}).refine(res => res.password === res.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword', 'password'],
})

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;