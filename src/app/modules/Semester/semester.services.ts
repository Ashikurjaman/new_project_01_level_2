import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TSemesterRegistration } from './semester.interface';
import { SemesterModel } from './semester.model';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { registrationSemester } from './semester.constant';

const createSemesterServices = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  const isSemesterRegistrationRunning = await SemesterModel.find({
    $or: [
      { status: registrationSemester.UPCOMING },
      { status: registrationSemester.ONGOING },
    ],
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
  const currentSemesterStatus = await SemesterModel.findById(id);
  const requestedStatus = payload?.status;
  if (!currentSemesterStatus) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found');
  }
  if (currentSemesterStatus?.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus?.status}`,
    );
  }

  if (
    currentSemesterStatus.status === registrationSemester.UPCOMING &&
    requestedStatus === registrationSemester.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Semester can not change form ${currentSemesterStatus?.status} to ${requestedStatus}`,
    );
  }
  if (
    currentSemesterStatus.status === registrationSemester.ONGOING &&
    requestedStatus === registrationSemester.ONGOING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Semester can not change form ${currentSemesterStatus?.status} to ${requestedStatus}`,
    );
  }
  const result = SemesterModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const semesterServices = {
  createSemesterServices,
  getSingleSemester,
  updateSemester,
  getAllSemester,
};
