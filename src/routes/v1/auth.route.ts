import express from 'express';
import { validate } from '../../middlewares/validate';
import { authController } from '../../controllers';
import { authValidations } from '../../validations';
import { auth } from '../../middlewares/auth';

export const authRouter = express.Router();

authRouter.post('/register', validate(authValidations.register), authController.registerUser);
authRouter.post('/login', validate(authValidations.login), authController.loginUser);
authRouter.post('/refresh', validate(authValidations.refresh), authController.refreshToken);
authRouter.get('/test', auth(), (req, res) => {
  res.send('OK');
});
