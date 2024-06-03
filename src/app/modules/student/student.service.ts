import { StudentModel } from './student.model';

const getStudentAllDataFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getStudentSingleDataFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const studentServices = {
  getStudentAllDataFromDB,
  getStudentSingleDataFromDb,
};
