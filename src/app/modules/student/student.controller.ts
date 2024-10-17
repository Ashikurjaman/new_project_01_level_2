import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await studentServices.getStudentAllDataFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Data Retrieve successfully',
      data: result,
    });
  },
);

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
const deletedStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params?.studentId;
  const result = await studentServices.DeletedStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data successfully found',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentData(id, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data Updated successfully',
    data: result,
  });
});

export const StudentController = {
  getStudent,
  getSingleStudent,
  deletedStudent,
  updateStudent,
};
