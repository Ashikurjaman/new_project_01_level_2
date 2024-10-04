import express, { NextFunction } from 'express';
import { userController } from './users.controller';

import { studentValidation } from '../student/student.validate';
import { validateRequest } from '../../middleware/validateRequest';
import { AdminValidations } from '../Admin/Admin.validation';
import { FacultyValidations } from '../Faculty/Faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
);
router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
export const UserRouter = router;
