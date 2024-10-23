import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const loginController: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: result,
  });
});

export const AuthController = {
  loginController,
};
