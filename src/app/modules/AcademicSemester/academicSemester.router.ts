import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './AcademicSemester.validate';
import { USER_ROLE } from '../users/user.constant';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.admin),
  validateRequest(AcademicSemesterValidation.academicValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/get-academic-semester/:id',
  auth(USER_ROLE.admin),
  AcademicSemesterController.getOneAcademicSemester,
);
router.patch(
  '/get-academic-semester/:id',
  auth(USER_ROLE.admin),
  validateRequest(AcademicSemesterValidation.updateAcademicValidationSchema),
  AcademicSemesterController.getOneAcademicSemesterUpdate,
);
router.get(
  '/get-academic-semester',
  auth(USER_ROLE.admin),
  AcademicSemesterController.getAcademicSemester,
);

export const AcademicSemesterRoute = router;
