import QueryBuilder from '../../builder/QueryBuilder';
import { FacultySearchableFields } from './Faculty.constant';
import { TFaculty } from './Faculty.interface';
import { Faculty } from './Faculty.model';

const getAllAdmin = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .filter()
    .sort()
    .search(FacultySearchableFields)
    .paginate()
    .fields();

  const result = facultyQuery.modelQuery;
  return result;
};

const getSingleAdmin = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};
const updateAdmin = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteAdmin = async (id: string) => {
  const result = await Faculty.findByIdAndDelete(id, {
    isDelete: true,
    new: true,
  });
  return result;
};

export const FacultyServices = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
