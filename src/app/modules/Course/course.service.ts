import { TCourse } from './course.interface';
import { CourseModel } from './course.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearch } from './course.constant';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getCourseIntoDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .search(courseSearch)
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseIntoDb = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};
const deleteSingleCourseIntoDb = async (id: string) => {
  const result = await CourseModel.findById(
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
};
