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
  const refreshToken = jwt.sign(jwtPayLoad, config.jwt_secret_token as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userExists.needsPasswordsChange,
  };
};

const ChangePasswordController = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const userExists = await User.isUserExistsByCustomId(userData.userId);
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
const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_secret_token as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;
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
  const jwtPayLoad = { userId: userExists.id, role: userExists.role };
  const accessToken = jwt.sign(jwtPayLoad, config.jwt_secret_token as string, {
    expiresIn: '10h',
  });
  return accessToken;
};

export const AuthService = {
  loginUser,
  ChangePasswordController,
  refreshToken,
};
