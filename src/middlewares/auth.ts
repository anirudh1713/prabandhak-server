import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import ApiError from '../utils/ApiError';

export const auth = () => (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return next(new ApiError(401, 'Please authenticate.'));
    }

    return next();
  })(req, res, next);
};
