import { TCourse } from './course.interface';
import { CourseModel } from './course.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearch } from './course.constant';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getCourseIntoDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .search(courseSearch)
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseIntoDb = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

// update course
const updateSingleCourseIntoDb = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...updateBasicInfo } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updatePreRequisite = await CourseModel.findByIdAndUpdate(
      id,
      updateBasicInfo,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatePreRequisite) {
      throw new AppError(httpStatus.BAD_REQUEST, 'unable to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisite = preRequisiteCourses
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course);

      const deletedPrerequisiteCourse = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletePreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPrerequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'unable to update course');
      }
      const addPrerequisite = preRequisiteCourses.filter(
        el => el.course && !el.isDeleted,
      );

      const addPreRequisiteCourse = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: addPrerequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!addPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'unable to update course');
      }
    }

    const result = await CourseModel.findById(id, { session }).populate(
      'preRequisiteCourses.course',
    );
    session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'unable to update course');
  }
};
const deleteSingleCourseIntoDb = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getCourseIntoDb,
  getSingleCourseIntoDb,
  deleteSingleCourseIntoDb,
  updateSingleCourseIntoDb,
};
