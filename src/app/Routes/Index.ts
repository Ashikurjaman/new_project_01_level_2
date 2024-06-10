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
    path: '/users',
    route: UserRouter,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/users', UserRouter);

export default router;
