import {z} from 'zod';

const envSchema = z.object({
  PORT: z.string(),
  JWT_SECRET: z.string(),
  MIDTRANS_SERVER_KEY: z.string(),
  MIDTRANS_CLIENT_KEY: z.string(),
  MIDTRANS_IS_PRODUCTION: z.string().transform(val => val === 'true'),
  FRONTEND_URL: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_KEY: z.string(),
})

export const env = envSchema.parse(process.env);