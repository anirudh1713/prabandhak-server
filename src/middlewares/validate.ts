import {NextFunction, Request, Response} from 'express';
import _ from 'lodash';
import {AnyZodObject, ZodError, ZodErrorMap} from 'zod';
import ApiError from '../utils/ApiError';

const zErrorMap: ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case 'invalid_type':
      return {message: `${issue.path} must be of type ${issue.expected}`};

    default:
      return {message: ctx.defaultError};
  }
};

export const validate =
  (z: AnyZodObject) => (req: Request, __: Response, next: NextFunction) => {
    try {
      const data = {
        body: req.body,
        params: req.params,
        query: req.query,
      };

      z.parse(data, {errorMap: zErrorMap});
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = _.map(error.issues, 'message').join(',');
        next(new ApiError(400, message));
      }
    }
  };
