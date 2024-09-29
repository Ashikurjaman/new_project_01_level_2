import { TAcademicSemester } from './../AcademicSemester/academicSemester.Interface';
import { User } from './users.model';
import config from '../../config';
import { TUser } from './users.interface';
import { Student } from '../student/student.model';
import { TStudent } from '../student/student.interface';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { generateID } from './users.utlis';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';

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
  userData.id = await generateID(academicSemester);

  // create user
  const newUser = await User.create(userData);

  // create Student

  if (Object.keys(newUser).length) {
    // set id ,_id ass user
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDb,
};
