import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic DepartMent Created Successfully',
      data: result,
    });
  },
);
const getAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result =
      await AcademicDepartmentServices.getAcademicDepartmentFromDb();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic DepartMent retrieve Successfully',
      data: result,
    });
  },
);
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic DepartMent retrieve Successfully',
      data: result,
    });
  },
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.body;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(
        id,
        payload,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic DepartMent updated Successfully',
      data: result,
    });
  },
);

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
