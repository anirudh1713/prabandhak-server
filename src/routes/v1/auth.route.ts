import express from 'express';
import { validate } from '../../middlewares/validate';
import * as authValidation from '../../validations/auth.validation';

export const authRouter = express.Router();

authRouter.post('/register', validate(authValidation.register));
