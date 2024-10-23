import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validate';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  AcademicFacultyController.createAcademicFaculty,
);

router.get(
  '/:facultyId',
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  AcademicFacultyController.getSingleAcademicFaculty,
);
router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidateSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);
router.get(
  '/',
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  AcademicFacultyController.getAllAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
