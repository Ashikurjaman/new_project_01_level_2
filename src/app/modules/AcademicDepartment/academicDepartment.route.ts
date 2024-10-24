import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicDepartmentControllers } from './academicDepartMent.controller';
import { AcademicDepartmentValidate } from './academicDepartment.validation';
import { USER_ROLE } from '../users/user.constant';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.admin),
  validateRequest(AcademicDepartmentValidate.academicDepartmentValidateSchema),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin),
  // validateRequest(AcademicDepartmentValidate.academicDepartmentValidateSchema),
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidate.updateAcademicDepartmentValidateSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  // validateRequest(AcademicDepartmentValidate.academicDepartmentValidateSchema),
  academicDepartmentControllers.getAcademicDepartment,
);

export const AcademicDepartmentRoute = router;
