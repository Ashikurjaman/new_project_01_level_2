import { NextFunction, Request, Response } from 'express';
import studentJoiSchema from '../student/student.validate';
import { userService } from './users.service';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const { error, value } = studentJoiSchema.validate(studentData);
    const result = await userService.createStudentIntoDb(password, studentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfully',
    //   data: result,
    // });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
