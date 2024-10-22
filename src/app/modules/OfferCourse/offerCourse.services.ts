import { semesterRegistration } from './../Semester/semester.route';
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { SemesterModel } from '../Semester/semester.model';
import { TOfferedCourse } from './offerCourse.interface';
import { OfferedCourseModel } from './offerCourse.model';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
import { CourseModel } from '../Course/course.model';
import { AcademicFaculty } from '../AcademicFaculty/academicFaculty.model';
import { Faculty } from '../Faculty/Faculty.model';
import { hasTimeConflict } from './offerCourse.constant';
import QueryBuilder from '../../builder/QueryBuilder';

const CreateOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration Does not Exists',
    );
  }
  const academicSemester = isSemesterRegistrationExists.academicSemester;
  const isAcademicDepartment =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department Does not Exists',
    );
  }
  const isAcademicFaculty = await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Faculty Does not Exists',
    );
  }
  const isCourse = await CourseModel.findById(course);

  if (!isCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course Does not Exists');
  }
  const isFaculty = await Faculty.findById(faculty);

  if (!isFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Does not Exists');
  }
  const isDepartmentBelongToAcademicFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToAcademicFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartment.name} does not belongs to ${isAcademicFaculty.name}`,
    );
  }

  const existingFacultySchedule = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(existingFacultySchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available in this time please choose other time or day `,
    );
  }

  const isSectionSemesterAndCourseExists = await OfferedCourseModel.findOne({
    course,
    section,
    semesterRegistration,
  });
  if (isSectionSemesterAndCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `OfferCourse with same section already Exists`,
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

const updateOfferedCourse = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.CONFLICT, `This faculty doesn't exists`);
  }
  const isOfferCourseExists = await OfferedCourseModel.findById(id);

  if (!isOfferCourseExists) {
    throw new AppError(httpStatus.CONFLICT, `Offer Course doesn't exists`);
  }

  const existingFacultySchedule = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(existingFacultySchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available in this time please choose other time or day `,
    );
  }
  const semesterRegistrationData = isOfferCourseExists.semesterRegistration;

  const semesterRegistrationStatus = await SemesterModel.findById(
    semesterRegistrationData,
  ).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.CONFLICT,
      `Offer Course can't update | because ${semesterRegistrationStatus}`,
    );
  }
  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getAllOfferCourse = async (query: Record<string, unknown>) => {
  const getallOfferCourseFromDb = new QueryBuilder(
    OfferedCourseModel.find(),
    query,
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await getallOfferCourseFromDb.modelQuery;
  return result;
};
const getSingleOfferCourse = async (id: string) => {
  const result = await OfferedCourseModel.findById(id);
  return result;
};
const deleteOfferCourse = async (id: string) => {
  const data = await OfferedCourseModel.findById(id);
  const semesterRegistrationData = await SemesterModel.findById(
    data?.semesterRegistration,
  ).select('status');
  if (semesterRegistrationData?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.CONFLICT,
      `This semester already ${semesterRegistrationData?.status}`,
    );
  }
  return data;
};

export const OfferCourseServices = {
  CreateOfferedCourse,
  updateOfferedCourse,
  getAllOfferCourse,
  getSingleOfferCourse,
  deleteOfferCourse,
};
