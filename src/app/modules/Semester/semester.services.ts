import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TSemesterRegistration } from './semester.interface';
import { SemesterModel } from './semester.model';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterServices = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  const isSemesterRegistrationRunning = await SemesterModel.find({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  if (isSemesterRegistrationRunning) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an${payload.status} register semester`,
    );
  }

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, `Academic semester doesn't found`);
  }
  const isSemesterRegistrationExists = await SemesterModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This Semester Already Exists');
  }
  const result = SemesterModel.create(payload);
  return result;
};
const getAllSemester = async (query: Record<string, unknown>) => {
  const semesterRegistrationGetSingleDataQuery = new QueryBuilder(
    SemesterModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate();
  const result = await semesterRegistrationGetSingleDataQuery.modelQuery;
  return result;
};
const getSingleSemester = async (id: string) => {
  const result = SemesterModel.findById(id);
  return result;
};
const updateSemester = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const requestedSemester = await SemesterModel.findById(id);
  if (!requestedSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found');
  }
  if (requestedSemester?.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${requestedSemester?.status}`,
    );
  }
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
