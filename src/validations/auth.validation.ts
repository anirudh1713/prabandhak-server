import { z } from 'zod';

export const register = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});
export type TRegisterUserInput = z.infer<typeof register>['body'];

export const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
export type TLoginUserInput = z.infer<typeof login>['body'];

export const refresh = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});
export type TRefreshTokenInput = z.infer<typeof refresh>['body'];
