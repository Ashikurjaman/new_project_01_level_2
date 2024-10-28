import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { User } from '../users/users.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

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

  const jwtPayLoad = { userId: userExists.id, role: userExists.role };
  const accessToken = jwt.sign(jwtPayLoad, config.jwt_secret_token as string, {
    expiresIn: '1h',
  });

  return {
    accessToken,
    needPasswordChange: userExists.needsPasswordsChange,
  };
};

const ChangePasswordController = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const userExists = await User.isUserExistsByCustomId(userData.userID);
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
    payload.oldPassword,
    userExists?.password,
  );
  if (!passwordCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const hashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: hashPassword,
      needsPasswordsChange: false,
      needsPasswordsChangeAt: new Date(),
    },
  );
  return null;
};

export const AuthService = {
  loginUser,
  ChangePasswordController,
};
