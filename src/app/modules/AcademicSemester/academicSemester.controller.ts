import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';


const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
  },
);

const getAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await AcademicSemesterService.getAcademicSemester();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Found All Academic Semester successfully',
      data: result,
    });
  },
);
const getOneAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params?.id;
    const result = await AcademicSemesterService.getOneAcademicSemester(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester found successfully',
      data: result,
    });
  },
);
const getOneAcademicSemesterUpdate: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params?.id;

    const result = await AcademicSemesterService.getOneAcademicSemesterUpdate(
      id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester updated successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getOneAcademicSemester,
  getAcademicSemester,
  getOneAcademicSemesterUpdate,
};
