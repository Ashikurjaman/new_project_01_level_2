import express, { NextFunction, Request, Response } from 'express';
import { userController } from './users.controller';

const router = express.Router();
const checkingData = (req: Request, res: Response, next: NextFunction) => {
  console.log('checking data');
  next();
};
router.post('/create-student', checkingData, userController.createStudent);
export const UserRouter = router;
