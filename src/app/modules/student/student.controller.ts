import { Request, Response } from 'express';
import { studentServices } from './student.service';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  // will send response
  try {
    const userNameSchema = Joi.object({
      firstName: Joi.string().trim().required(),
      middleName: Joi.string().trim(),
      lastName: Joi.string().trim().required(),
      // Add any other properties and validation rules you have in the userNameSchema
    });
    const studentJoiSchema = Joi.object({
      id: Joi.string().required(),
      name: userNameSchema.required(),
      gender: Joi.string().valid('male', 'female', 'others').required(),
      contactNo: Joi.string().optional(),
      emergencyContactNo: Joi.string().optional(),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B-', 'B+', 'AB-', 'AB+')
        .optional(),
      email: Joi.string().email().required(),
      avatar: Joi.string().optional(),
      presentAddress: Joi.string().trim().optional(),
      paramentAddress: Joi.string().trim().optional(),
      isActive: Joi.string().valid('Active', 'UnActive').required(),
    });

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
