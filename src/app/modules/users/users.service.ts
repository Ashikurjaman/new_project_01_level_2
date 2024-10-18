import { TAcademicSemester } from './../AcademicSemester/academicSemester.Interface';
import { User } from './users.model';
import config from '../../config';
import { TUser } from './users.interface';
import { Student } from '../student/student.model';
import { TStudent } from '../student/student.interface';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { generateAdminId, generateFacultyId, generateID } from './users.utlis';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TFaculty } from '../Faculty/Faculty.interface';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
import { Admin } from '../Admin/Admin.model';
import { TAdmin } from '../Admin/Admin.interFace';
import { Faculty } from '../Faculty/Faculty.model';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // create a empty object
  const userData: Partial<TUser> = {};

  //if password not given then use default password

  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';
  // set id manually

  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateID(academicSemester);
    // create user
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id ,_id ass user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }

  // create Student
};

// create Admin
const createAdminIntoDb = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = 'admin';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

// create Faculty
const createFacultyIntoDb = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = 'faculty';

  const academicDepartMent = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartMent) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Department Does not found',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

export const userService = {
  createStudentIntoDb,
  createAdminIntoDb,
  createFacultyIntoDb,
};
