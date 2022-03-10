import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { ResponseLocals } from 'utils';
import ApiError from '../utils/ApiError';

export const auth = () => (
  req: Request,
  res: Response<any, ResponseLocals>,
  next: NextFunction,
) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return next(new ApiError(401, 'Please authenticate.'));
    }

    res.locals.user = user;
    return next();
  })(req, res, next);
};
