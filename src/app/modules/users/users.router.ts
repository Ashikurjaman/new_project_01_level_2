import express, { NextFunction } from 'express';
import { userController } from './users.controller';

import { studentValidation } from '../student/student.validate';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  userController.createStudent,
);
export const UserRouter = router;
