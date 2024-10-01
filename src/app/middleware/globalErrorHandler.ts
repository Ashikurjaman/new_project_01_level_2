import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorResource } from '../interface/interface';
import { handelZodError } from '../error/ZodError';
import { handelValidationError } from '../error/ValidationError';
import { handelCastError } from '../error/CastError';
import { AppError } from '../error/AppError';

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

  if (err instanceof ZodError) {
    const simpleFide = handelZodError(err);
    statusCode = simpleFide.statusCode;
    message = simpleFide.message;
    errorResource = simpleFide.errorSource;
  } else if (err.name === 'ValidationError') {
    const simpleFide = handelValidationError(err);
    statusCode = simpleFide.statusCode;
    message = simpleFide.message;
    errorResource = simpleFide.errorSource;
  } else if (err.name === 'CastError') {
    const simpleFide = handelCastError(err);
    statusCode = simpleFide.statusCode;
    message = simpleFide.message;
    errorResource = simpleFide.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorResource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorResource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorResource,
    err,
    stack: err.stack,
  });
};
