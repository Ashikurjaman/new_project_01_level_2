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
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Courses retrieve successfully',
      data: result,
    });
  },
);
const getSingleCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await courseServices.getSingleCourseIntoDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course retrieve successfully',
      data: result,
    });
  },
);

const updateCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await courseServices.updateSingleCourseIntoDb(id, payload);
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
  getSingleCourse,
  getAllCourse,
  updateCourse,
};
