import {z} from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  role: z.enum(['ADMIN', 'PARTICIPANT'], 'Role must be either ADMIN or PARTICIPANT'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
})

export type UserSchema = z.infer<typeof userSchema>;