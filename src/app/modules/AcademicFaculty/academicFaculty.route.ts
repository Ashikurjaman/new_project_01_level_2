import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validate';
import { AcademicFacultyController } from './academicFaculty.controller';
import { USER_ROLE } from '../users/user.constant';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.admin),
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  AcademicFacultyController.createAcademicFaculty,
);

router.get(
  '/:facultyId',
  auth(USER_ROLE.admin),
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  AcademicFacultyController.getSingleAcademicFaculty,
);
router.patch(
  '/:facultyId',
  auth(USER_ROLE.admin),
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidateSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);
router.get(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  AcademicFacultyController.getAllAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
