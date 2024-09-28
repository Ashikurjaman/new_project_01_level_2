import { RequestHandler } from 'express';
import { userService } from './users.service';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  // const { error, value } = userValidation.validate(studentData);
  const result = await userService.createStudentIntoDb(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
};
