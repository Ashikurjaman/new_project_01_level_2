import { Request, Response } from 'express';
import studentJoiSchema from '../student/student.validate';
import { userService } from './users.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const { error, value } = studentJoiSchema.validate(studentData);
    const result = await userService.createStudentIntoDb(studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
