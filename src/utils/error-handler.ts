import { ErrorRequestHandler } from 'express';
import ApiError from './ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err: ApiError, _req, res, _next) => {
  res.status(err.statusCode).send({ code: err.statusCode, message: err.message });
};

export default errorHandler;
