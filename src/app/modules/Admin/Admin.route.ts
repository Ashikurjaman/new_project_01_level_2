import express from 'express';
import { AdminController } from './Admin.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { AdminValidations } from './Admin.validation';
import { USER_ROLE } from '../users/user.constant';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), AdminController.getAllAdmin);
router.get('/:id', auth(USER_ROLE.admin), AdminController.getSingleAdmin);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminController.updateAdmin,
);
router.delete('/:id', auth(USER_ROLE.admin), AdminController.deleteAdmin);

export const AdminRoute = router;
