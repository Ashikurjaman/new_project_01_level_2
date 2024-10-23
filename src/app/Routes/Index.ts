import { AcademicDepartmentRoute } from '../modules/AcademicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/AcademicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/AcademicSemester/academicSemester.router';
import { AdminRoute } from '../modules/Admin/Admin.route';
<<<<<<< HEAD
import { courseRoute } from '../modules/Course/course.route';
import { FacultyRoute } from '../modules/Faculty/Faculty.router';
=======
import { AuthRoute } from '../modules/Auth/auth.route';
import { courseRoute } from '../modules/Course/course.route';
import { FacultyRoute } from '../modules/Faculty/Faculty.router';
import { offerCourseRoute } from '../modules/OfferCourse/offerCourse.route';
import { semesterRegistration } from '../modules/Semester/semester.route';
>>>>>>> d451b20c80105bfe0ec156e99cd02742fd04ed34
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
<<<<<<< HEAD
=======
  {
    path: '/semester',
    route: semesterRegistration,
  },
  {
    path: '/offerCourse',
    route: offerCourseRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
>>>>>>> d451b20c80105bfe0ec156e99cd02742fd04ed34
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/users', UserRouter);

export default router;
