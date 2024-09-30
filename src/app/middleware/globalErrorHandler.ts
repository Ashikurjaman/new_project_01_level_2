import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorResource } from '../interface/interface';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorResource: TErrorResource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];
  const handelZodError = (err: ZodError) => {
    const errorSource: TErrorResource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const statusCode = 400;

    return {
      statusCode,
      message: 'Zod Validation Error',
      errorSource,
    };
  };
  if (err instanceof ZodError) {
    const simpleFide = handelZodError(err);
    statusCode = simpleFide.statusCode;
    message = simpleFide.message;
    errorResource = simpleFide.errorSource;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorResource,
    error: err,
  });
};
