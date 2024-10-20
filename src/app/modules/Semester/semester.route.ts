import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { semesterRegistrationValidation } from './semester.validation';
import { semesterController } from './semester.controller';

const router = express.Router();

router.post(
  '/semesterRegistration',
  validateRequest(
    semesterRegistrationValidation.createSemesterValidationSchema,
  ),
  semesterController.createSemesterController,
);
router.get('/:id', semesterController.getSingleSemester);

router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidation.updateSemesterValidationSchema,
  ),
  semesterController.updateSemester,
);
router.get('/', semesterController.getAllSemester);

export const semesterRegistration = router;
