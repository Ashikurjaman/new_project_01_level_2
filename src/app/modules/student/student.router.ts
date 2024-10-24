import express from 'express';
import { StudentController } from './student.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

// will added controller

router.get('/', auth(USER_ROLE.admin), StudentController.getStudent);
router.get('/:studentId', auth(), StudentController.getSingleStudent);
router.delete('/:studentId', auth(), StudentController.deletedStudent);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.student),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
