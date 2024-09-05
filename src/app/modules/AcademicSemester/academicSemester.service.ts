import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.Interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getOneAcademicSemester = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });
  return result;
};
const getOneAcademicSemesterUpdate = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAcademicSemester,
  getOneAcademicSemester,
  getOneAcademicSemesterUpdate,
};
