import { TSemesterRegistration } from './semester.interface';
import { SemesterModel } from './semester.model';

const createSemesterServices = async (payload: TSemesterRegistration) => {
  const result = SemesterModel.create(payload);
  return result;
};
const getSingleSemester = async (id: string) => {
  const result = SemesterModel.findById(id);
  return result;
};
const getAllSemester = async () => {
  const result = SemesterModel.find();
  return result;
};
const updateSemester = async (id: string, payload: TSemesterRegistration) => {
  const result = SemesterModel.findByIdAndUpdate(id, payload, {
    upsert: true,
    new: true,
  });
  return result;
};

export const semesterServices = {
  createSemesterServices,
  getSingleSemester,
  updateSemester,
  getAllSemester,
};
