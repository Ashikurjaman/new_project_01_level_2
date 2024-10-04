import express from 'express';
import { AdminController } from './Admin.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { AdminValidations } from './Admin.validation';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getSingleAdmin);
router.post(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminController.updateAdmin,
);
router.delete('/:id', AdminController.deleteAdmin);

export const AdminRoute = router;
