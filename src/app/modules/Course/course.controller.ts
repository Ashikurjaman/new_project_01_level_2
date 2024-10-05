import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespond';
import { courseServices } from './course.service';
import { NextFunction, Request, RequestHandler, Response } from 'express';

const createCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await courseServices.createCourseIntoDb(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Course is created successfully 😆',
      data: result,
    });
  },
);

const getAllCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await courseServices.getCourseIntoDb(req.query);
    console.log(result, 'getall data');
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Courses retrieve successfully',
      data: result,
    });
  },
);
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { facultyId } = req.params;
    const result = await courseServices.getSingleCourseIntoDb(facultyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course retrieve successfully',
      data: result,
    });
  },
);
const deleteCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await courseServices.deleteSingleCourseIntoDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course deleted successfully',
      data: result,
    });
  },
);

export const courseController = {
  deleteCourse,
  createCourse,
  getSingleAcademicFaculty,
  getAllCourse,
};
