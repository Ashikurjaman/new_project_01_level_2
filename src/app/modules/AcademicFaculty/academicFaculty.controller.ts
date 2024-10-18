import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendRespond';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicFacultyServices.academicFacultyCrateIntoDb(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is created successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicFacultyServices.getAcademicFacultyFromDb();
    console.log(result, 'getall data');
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Faculty is retrieve successfully',
      data: result,
    });
  },
);
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is retrieve successfully',
      data: result,
    });
  },
);
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { facultyId } = req.params;
    const payload = req.body;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
      facultyId,
      payload,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is updated successfully',
      data: result,
    });
  },
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
