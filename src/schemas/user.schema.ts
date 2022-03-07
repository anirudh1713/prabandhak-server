import { User } from '@prisma/client';

/**
 * Schema is for select property of prisma.
 * To let prisma know which properties to return from query.
 */
export const userSchema: Record<keyof User, boolean> = {
  id: true,
  email: true,
  name: true,
  password: false,
};
