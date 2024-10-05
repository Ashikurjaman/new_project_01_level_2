import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../users/users.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchAbleFields } from './studentConstant';

// Get All Data
const getStudentAllDataFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchAbleFields = ['email', 'name.firstName', 'presentAddress'];

  // const SearchQuery = Student.find({
  //   $or: searchAbleFields.map(field => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const excludingFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludingFields.forEach(el => delete queryObj[el]);

  // const filterQuery = SearchQuery.find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // let page = 0;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);
  // let fields = '';

  // if (query.fields) {
  //   fields = String(query.fields).split(',').join(' ');
  // }
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = studentQuery.modelQuery;
  return result;
};
// Get single Data
const getStudentSingleDataFromDb = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
// update data
const updateStudentData = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  console.log(name);

  const modifiedDataUpdate: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedDataUpdate[`name.${key}`] = value;
      console.log(`name.${key}`);
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedDataUpdate[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedDataUpdate[`localGuardian.${key}`] = value;
    }
  }
  // console.log(modifiedDataUpdate);
  const result = await Student.findOneAndUpdate({ id }, modifiedDataUpdate, {
    new: true,
    runValidators: true,
  });

  return result;
};
// Delete data
const DeletedStudentFromDb = async (id: string) => {
  const findId = await Student.find({ id });
  if (!findId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This student does not exists');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const isDeletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!isDeletedStudent) {
      throw new AppError(httpStatus.NOT_FOUND, 'Failed to deleted student');
    }

    const isDeletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!isDeletedUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'Failed to deleted user');
    }

    await session.commitTransaction();
    await session.endSession();

    return isDeletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const studentServices = {
  getStudentAllDataFromDB,
  getStudentSingleDataFromDb,
  DeletedStudentFromDb,
  updateStudentData,
};
