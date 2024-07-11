import { Student } from './student.model';

const getStudentAllDataFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentSingleDataFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentServices = {
  getStudentAllDataFromDB,
  getStudentSingleDataFromDb,
};
