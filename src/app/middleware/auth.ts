import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../error/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/users/users.interface';

export const auth = (...requestedRoles: TUserRole[]) => {
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
        }
        const role = (decoded as JwtPayload).role;
        if (requestedRoles && !requestedRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not Authorized !',
          );
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};
