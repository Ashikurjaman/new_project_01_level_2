import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    //   const { password, student: studentData } = req.body;
    //   // const { error, value } = userValidation.validate(studentData);
    //   const result = await userService.createStudentIntoDb(password, studentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
