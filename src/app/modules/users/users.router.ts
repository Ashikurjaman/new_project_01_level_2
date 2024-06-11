import express, { NextFunction, Request, Response } from 'express';
import { userController } from './users.controller';

const router = express.Router();
const validateRequest = name => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //validation

    next();
  };
};
router.post(
  '/create-student',
  validateRequest('validations'),
  userController.createStudent,
);
export const UserRouter = router;
