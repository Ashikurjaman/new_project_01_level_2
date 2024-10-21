import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { SemesterModel } from '../Semester/semester.model';
import { TOfferedCourse } from './offerCourse.interface';
import { OfferedCourseModel } from './offerCourse.model';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
import { CourseModel } from '../Course/course.model';
import { AcademicFaculty } from '../AcademicFaculty/academicFaculty.model';
import { Faculty } from '../Faculty/Faculty.model';

const CreateOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    section,
    faculty,
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

export const OfferCourseServices = {
  CreateOfferedCourse,
};
