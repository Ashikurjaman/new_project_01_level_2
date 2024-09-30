import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../users/users.model';

const getStudentAllDataFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

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
};
