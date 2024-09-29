import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};
const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDb,
};
