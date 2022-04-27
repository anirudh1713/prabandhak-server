import prisma from '../prisma';

export const createWorkspace = async (name: string, initialUserId: number) => {
  const workspace = await prisma.workspace.create({
    data: {
      name,
      users: {
        create: {
          userId: initialUserId,
        },
      },
    },
  });

  return workspace;
};
