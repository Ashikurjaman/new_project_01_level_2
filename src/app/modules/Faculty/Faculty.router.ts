import express from 'express';
import { FacultyController } from './Faculty.controller';
import { FacultyValidations } from './Faculty.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyController.getAllFaculty,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyController.getSingleFaculty,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', auth(USER_ROLE.admin), FacultyController.deleteFaculty);

export const FacultyRoute = router;
