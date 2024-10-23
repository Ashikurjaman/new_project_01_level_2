import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../error/AppError';
import httpStatus from 'http-status';
import config from '../config';

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation

    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized !');
    }
    jwt.verify(
      token,
      config.jwt_secret_token as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not Authorized !',
          );
        } // decoded undefined

        req.userData = decoded as JwtPayload;
      },
    );
    next();
  });
};
