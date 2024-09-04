import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './AcademicSemester.validate';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.academicValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoute = router;