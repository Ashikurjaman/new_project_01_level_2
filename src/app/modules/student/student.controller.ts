import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getStudent = catchAsync(async (req, res, next) => {
  const result = await studentServices.getStudentAllDataFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params?.studentId;
  const result = await studentServices.getStudentSingleDataFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data successfully found',
    data: result,
  });
});

export const StudentController = {
  getStudent,
  getSingleStudent,
};
