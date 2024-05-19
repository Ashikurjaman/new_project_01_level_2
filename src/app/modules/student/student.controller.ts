import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  // will send response
  try {
    const { student: studentData } = req.body;
    console.log(studentData);
    const result = await studentServices.createStudentIntoDb(studentData);
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

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getStudentAllDataFromDB();
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

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params?.studentId;
    const result = await studentServices.getStudentSingleDataFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Student one Data Get',
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

export const StudentController = {
  createStudent,
  getStudent,
  getSingleStudent,
};
