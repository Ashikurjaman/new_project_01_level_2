import { NextFunction, Request, Response } from 'express';
import studentJoiSchema from '../student/student.validate';
import { userService } from './users.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const { error, value } = studentJoiSchema.validate(studentData);
    const result = await userService.createStudentIntoDb(password, studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
