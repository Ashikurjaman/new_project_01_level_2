import { AcademicDepartmentRoute } from '../modules/AcademicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/AcademicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/AcademicSemester/academicSemester.router';
import { AdminRoute } from '../modules/Admin/Admin.route';
import { courseRoute } from '../modules/Course/course.route';
import { FacultyRoute } from '../modules/Faculty/Faculty.router';
import { semesterRegistration } from '../modules/Semester/semester.route';
import { UserRouter } from '../modules/users/users.router';
import { StudentRoutes } from './../modules/student/student.router';
import { Router } from 'express';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/faculty',
    route: FacultyRoute,
  },
  {
    path: '/course',
    route: courseRoute,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/semester',
    route: semesterRegistration,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/users', UserRouter);

export default router;
