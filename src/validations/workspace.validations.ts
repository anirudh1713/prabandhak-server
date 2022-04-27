import {z} from 'zod';

export const createWorkspace = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export type TCreateWorkspaceInput = z.infer<typeof createWorkspace>['body'];
