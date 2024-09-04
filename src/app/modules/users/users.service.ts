import { User } from './users.model';
import config from '../../config';
import { TUser } from './users.interface';
import { Student } from '../student/student.model';
import { TStudent } from '../student/student.interface';

const createStudentIntoDb = async (password: string, student: TStudent) => {
  // create a empty object
  const userData: Partial<TUser> = {};

  //if password not given then use default password

  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';
  // set id manually
  userData.id = '2024100101';
  // create user
  const newUser = await User.create(userData);

  // create Student

  if (Object.keys(newUser).length) {
    // set id ,_id ass user
    student.id = newUser.id;
    student.user = newUser._id;
    const newStudent = await Student.create(student);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDb,
};
