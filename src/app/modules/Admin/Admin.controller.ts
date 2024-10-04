import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';
import { AdminServices } from './Admin.service';

const getAllAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminServices.getAllAdmin(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Data Retrieve successfully',
      data: result,
    });
  },
);
const getSingleAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AdminServices.getSingleAdmin(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Data Retrieve successfully',
      data: result,
    });
  },
);
const updateAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await AdminServices.updateAdmin(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Data Retrieve successfully',
      data: result,
    });
  },
);
const deleteAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await AdminServices.deleteAdmin(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Data Retrieve successfully',
      data: result,
    });
  },
);

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
