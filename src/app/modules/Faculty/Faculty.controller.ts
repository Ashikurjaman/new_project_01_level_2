import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import { FacultyServices } from './Faculty.service';

const getAllFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FacultyServices.getAllAdmin(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Data Retrieve successfully',
      data: result,
    });
  },
);
const getSingleFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleAdmin(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Data Retrieve successfully',
      data: result,
    });
  },
);
const updateFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyServices.updateAdmin(id, faculty);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Data Retrieve successfully',
      data: result,
    });
  },
);
const deleteFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await FacultyServices.deleteAdmin(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Data Retrieve successfully',
      data: result,
    });
  },
);

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
