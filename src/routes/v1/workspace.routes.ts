import express from 'express';
import {auth} from '../../middlewares/auth';
import {validate} from '../../middlewares/validate';
import {workspaceValidations} from '../../validations';
import {workspaceController} from '../../controllers';

export const workspaceRouter = express.Router();

workspaceRouter
  .route('/')
  .post(
    auth(),
    validate(workspaceValidations.createWorkspace),
    workspaceController.createWorkspace,
  );
