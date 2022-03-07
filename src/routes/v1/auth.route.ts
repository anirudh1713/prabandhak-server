import express from 'express';
import { validate } from '../../middlewares/validate';
import { authController } from '../../controllers';
import { authValidations } from '../../validations';

export const authRouter = express.Router();

authRouter.post('/register', validate(authValidations.register), authController.registerUser);
authRouter.post('/login', validate(authValidations.login), authController.loginUser);
