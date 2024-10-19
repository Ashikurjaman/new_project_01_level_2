import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';

const createSemesterController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await semesterServices.createSemesterServices;
  },
);
