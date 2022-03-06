import { z } from 'zod';

export const register = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});

export const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
