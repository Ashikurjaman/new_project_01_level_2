import { TAcademicSemester } from '../AcademicSemester/academicSemester.Interface';
import { User } from './users.model';

const findId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateID = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findId();
  const lastSemesterYear = lastStudentId?.substring(0, 4);
  const lastSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterYear = payload.year;
  const currentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    currentSemesterYear === lastSemesterYear
  ) {
    currentId = lastStudentId?.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
