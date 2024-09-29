import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicFacultyValidation } from '../AcademicFaculty/academicFaculty.validate';
import { academicDepartmentControllers } from './academicDepartMent.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get(
  '/:id',
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:id',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidateSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

router.get(
  '/',
  validateRequest(academicFacultyValidation.academicFacultyValidateSchema),
  academicDepartmentControllers.getAcademicDepartment,
);

export const AcademicDepartmentRoute = router;
