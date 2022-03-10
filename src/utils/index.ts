import { User } from '@prisma/client';

export const wrapWithData = (data: Record<string | number, any>) => {
  return {
    data: {
      ...data,
    },
  };
};

export interface ResponseLocals {
  user: User;
}
