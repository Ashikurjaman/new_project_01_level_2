import express from 'express';
import { FacultyController } from './Faculty.controller';
import { FacultyValidations } from './Faculty.validation';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.post(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoute = router;
