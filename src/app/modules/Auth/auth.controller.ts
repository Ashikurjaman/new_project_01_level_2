import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';

const loginController: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: result,
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

export const AuthController = {
  loginController,
  ChangePasswordController,
};
