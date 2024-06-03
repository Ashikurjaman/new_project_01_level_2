import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { User } from './users.model';

const createStudentIntoDb = async (student: Student) => {
  //const result = await StudentModel.create(student); // builtin static method mongoose
  //   const students = new StudentModel(student); // instance method in mongoose
  //   if (await students.isUserExist) {
  //     throw new Error('User Already Exists');
  //   }
  const result = User.create();
  return result;
};

export const userService = {
  createStudentIntoDb,
};
