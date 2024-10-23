import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendRespond';
import { semesterServices } from './semester.services';

const createSemesterController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await semesterServices.createSemesterServices(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration successfully',
      data: result,
    });
  },
);
const getSingleSemester: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await semesterServices.getSingleSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester get successfully',
    data: result,
  });
});
const getAllSemester: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await semesterServices.getAllSemester(req.params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Data Retrieve successfully',
    data: result,
  });
});
const updateSemester: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await semesterServices.updateSemester(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Data Retrieve successfully',
    data: result,
  });
});

export const semesterController = {
  createSemesterController,
  getSingleSemester,
  updateSemester,
  getAllSemester,
};
