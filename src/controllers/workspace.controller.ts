import {Request, Response} from 'express';
import {TCreateWorkspaceInput} from '../validations/workspace.validations';
import asyncHandler from '../utils/async-handler';
import {TAuthenticatedResponseLocals} from '../types';
import {workspaceService} from '../services';

export const createWorkspace = asyncHandler(
  async (
    req: Request<{}, {}, TCreateWorkspaceInput>,
    res: Response<{}, TAuthenticatedResponseLocals>,
  ) => {
    const workspaceName = req.body.name;
    const workspaceOwnerId = res.locals.user.id;

    const workspace = await workspaceService.createWorkspace(
      workspaceName,
      workspaceOwnerId,
    );

    return res.status(201).send({workspace});
  },
);
