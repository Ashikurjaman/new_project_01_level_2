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

router.get(
  '/get-academic-semester/:id',
  AcademicSemesterController.getOneAcademicSemester,
);
router.patch(
  '/get-academic-semester/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicValidationSchema),
  AcademicSemesterController.getOneAcademicSemesterUpdate,
);
router.get(
  '/get-academic-semester',
  AcademicSemesterController.getAcademicSemester,
);

export const AcademicSemesterRoute = router;
