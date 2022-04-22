import bcrypt from 'bcrypt';
import { config } from '../config/config';
import prisma from '../prisma';
import { TRegisterUserInput } from '../validations/auth.validation';
import { userSchema } from '../schemas/user.schema';

export const createUser = async (data: TRegisterUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, config.bcryptSaltOrRound);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: {
      ...userSchema,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
