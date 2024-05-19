import { StudentModel } from './student.model';
import { Student } from './student.interface';
const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getStudentAllDataFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getStudentSingleDataFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getStudentAllDataFromDB,
  getStudentSingleDataFromDb,
};
