import {z} from 'zod';

const envSchema = z.object({
  VITE_BASE_API_URL: z.string(),
  VITE_BASE_URL: z.string()
})

export const {VITE_BASE_API_URL, VITE_BASE_URL} = envSchema.parse(import.meta.env)