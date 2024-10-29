import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../error/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/users/users.interface';
import { User } from '../modules/users/users.model';

export const auth = (...requestedRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation

    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized !');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret_token as string,
    ) as JwtPayload;
    const { userId, role, iat } = decoded;
    const userExists = await User.isUserExistsByCustomId(userId);
    if (!userExists) {
      throw new AppError(httpStatus.FORBIDDEN, 'User not found');
    }

    const isDeleted = userExists?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User not found');
    }

    const isBlocked = userExists.status;
    if (isBlocked === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User blocked');
    }

    if (
      userExists.needsPasswordsChangeAt &&
      User.isPasswordChangeBeforeTokenIssued(
        userExists.needsPasswordsChangeAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized !');
    }
    if (requestedRoles && !requestedRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized !');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
