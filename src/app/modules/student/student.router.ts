import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will added controller
router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getStudent);
router.get('/:studentId', StudentController.getSingleStudent);

export const StudentRoutes = router;
