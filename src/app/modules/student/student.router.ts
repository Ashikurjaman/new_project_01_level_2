import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will added controller

router.get('/', StudentController.getStudent);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deletedStudent);
router.patch('/:id', StudentController.updateStudent);

export const StudentRoutes = router;
