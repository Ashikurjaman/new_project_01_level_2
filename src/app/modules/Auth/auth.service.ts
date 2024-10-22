import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { User } from '../users/users.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const userExists = await User.isUserExistsByCustomId(payload.id);
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
  const passwordCheck = await User.isPasswordMatched(
    payload.password,
    userExists?.password,
  );
  if (!passwordCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const jwtPayLoad = { userId: userExists, role: userExists.role };
  const accessToken = jwt.sign(jwtPayLoad, config.jwt_secret_token as string, {
    expiresIn: '1h',
  });

  return {
    accessToken,
    needPasswordChange: userExists.needsPasswordsChange,
  };
};

export const AuthService = {
  loginUser,
};
