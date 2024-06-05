import { Student } from './../student/student.interface';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { User } from './users.model';
import config from '../../config';
import { NewUser } from './users.interface';

const createStudentIntoDb = async (password: string, student: Student) => {
  // create a empty object
  const user: NewUser = {};

  //if password not given then use default password

  user.password = password || (config.default_password as string);

  // set student role
  user.role = 'student';
  // set id manually
  user.id = '2024100101';
  // create user
  const result = await User.create(user);

  // create Student

  if (Object.keys(result).length) {
    // set id ,_id ass user
    student.id = result.id;
    student.user = result._id;
  }
  return result;
};

export const userService = {
  createStudentIntoDb,
};
