import { Request, Response, NextFunction } from 'express';

type FN = (req: Request, res: Response<any, any>, next: NextFunction) => Promise<any | void> | void;

/**
 * Utility function that catches any errors and forwards to error handler.
 *
 * @param fn CallbackFunction
 */
const asyncHandler = (
  fn: FN,
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default asyncHandler;
