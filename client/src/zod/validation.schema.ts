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

export const registrationIndividualSchema = z.object({
  competitionId: z.string().min(1, 'Competition id is required'),
  userId: z.string().min(1, 'User id is required'),
})

export const registrationTeamSchema = z.object({
  competitionId: z.string().min(1, 'Competition id is required'),
  leaderId: z.string().min(1, 'Leader id is required'),
  teamName: z.string().min(1, 'Team name is required'),
  memberNames: z.array(z.string().min(1, 'Member name is required')).min(1, 'At least one member name is required'),
  memberEmails: z.array(z.email('Invalid email address')).min(1, 'At least one member email is required'),
  memberPhoneNumbers: z.array(z.string().min(1, 'Member phone number is required')).min(1, 'At least one member phone number is required'),
})

export type RegistrationIndividualSchema = z.infer<typeof registrationIndividualSchema>;
export type RegistrationTeamSchema = z.infer<typeof registrationTeamSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;