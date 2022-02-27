import { ErrorRequestHandler } from 'express';
import ApiError from '../utils/ApiError';

/**
 * Converts error to ApiEror.
 *
 * @param err Error passed by express
 * @param req express request
 * @param res express response
 * @param next next function
 */
const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    error = new ApiError(statusCode, message);
  }

  next(error);
};

export default errorConverter;
