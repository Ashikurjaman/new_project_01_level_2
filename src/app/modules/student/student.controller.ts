import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getStudentAllDataFromDB();
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params?.studentId;
    const result = await studentServices.getStudentSingleDataFromDb(studentId);
    res.status(200).json({
      success: true,

      message: 'Student one Data Get',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getStudent,
  getSingleStudent,
};
