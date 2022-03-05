import express from 'express';
import { z } from 'zod';
import * as authValidation from '../../validations/auth.validation';

const zErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case 'invalid_type':
      return { message: `${issue.path} must be of type ${issue.expected}` };

    default:
      return { message: ctx.defaultError };
  }
};

export const authRouter = express.Router();

authRouter.post('/register', (req, res, next) => {
  try {
    authValidation.register.parse(req.body, { errorMap: zErrorMap });
    next();
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error.message);
    // Trow new APIError here.
  }
});
