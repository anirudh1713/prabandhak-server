import { z } from 'zod';

export const register = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});
export type RegisterUserInput = z.infer<typeof register>['body'];

export const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
export type LoginUserInput = z.infer<typeof login>['body'];
