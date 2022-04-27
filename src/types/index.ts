import {User} from '@prisma/client';

export type TAuthenticatedResponseLocals = {
  user: User;
};
