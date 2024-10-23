import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../error/AppError';
import httpStatus from 'http-status';

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation

    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized !');
    }
    next();
  });
};
