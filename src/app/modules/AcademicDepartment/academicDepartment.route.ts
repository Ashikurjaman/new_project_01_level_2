import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicDepartmentControllers } from './academicDepartMent.controller';
import { AcademicDepartmentValidate } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicDepartmentValidate.academicDepartmentValidateSchema),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get(
  '/:id',
  // validateRequest(AcademicDepartmentValidate.academicDepartmentValidateSchema),
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidate.updateAcademicDepartmentValidateSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

router.get(
  '/',
  // validateRequest(AcademicDepartmentValidate.academicDepartmentValidateSchema),
  academicDepartmentControllers.getAcademicDepartment,
);

export const AcademicDepartmentRoute = router;
