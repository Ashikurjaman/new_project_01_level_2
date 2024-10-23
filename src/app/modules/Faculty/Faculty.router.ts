import express from 'express';
import { FacultyController } from './Faculty.controller';
import { FacultyValidations } from './Faculty.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.get('/', auth(), FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoute = router;
