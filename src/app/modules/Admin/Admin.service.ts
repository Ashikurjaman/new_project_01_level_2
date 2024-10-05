import { TAdmin } from './Admin.interFace';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './Admin.constant';
import { Admin } from './Admin.model';

const getAllAdmin = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .filter()
    .sort()
    .search(AdminSearchableFields)
    .paginate()
    .fields();

  const result = adminQuery.modelQuery;
  return result;
};

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};
const updateAdmin = async (id: string, payload: Partial<TAdmin>) => {
  // console.log(payload);
  const { name, ...remainingData } = payload;
  console.log(name);
  const modifiedDataUpdate: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedDataUpdate[`name.${key}`] = value;
      // console.log(modifiedDataUpdate);
    }
  }
  console.log(modifiedDataUpdate, '😀');
  const result = await Admin.findByIdAndUpdate(id, modifiedDataUpdate, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteAdmin = async (id: string) => {
  const result = await Admin.findByIdAndDelete(id, {
    isDelete: true,
    new: true,
  });
  return result;
};

export const AdminServices = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
