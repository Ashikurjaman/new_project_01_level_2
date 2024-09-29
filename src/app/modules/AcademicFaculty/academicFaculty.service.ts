import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const academicFacultyCrateIntoDb = async (payload: TAcademicFaculty) => {
  const result = AcademicFaculty.create(payload);
  return result;
};

const getAcademicFacultyFromDb = async () => {
  const result = AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = AcademicFaculty.findById({ _id: id });
  return result;
};

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  academicFacultyCrateIntoDb,
  getAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  updateAcademicFacultyIntoDb,
};
