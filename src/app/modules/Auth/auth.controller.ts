import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const loginController: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node == 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: { accessToken, needPasswordChange },
  });
});
const ChangePasswordController: RequestHandler = catchAsync(
  async (req, res) => {
    const { ...data } = req.body;
    const result = await AuthService.ChangePasswordController(
      req.user as JwtPayload,
      data,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login Successfully',
      data: result,
    });
  },
);
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh Token Create Successfully',
    data: result,
  });
});

export const AuthController = {
  loginController,
  ChangePasswordController,
  refreshToken,
};
