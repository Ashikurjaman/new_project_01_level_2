import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.courseValidationSchema),
  courseController.createCourse,
);

router.get('/:id', courseController.getSingleAcademicFaculty);
router.get('/', courseController.getAllCourse);
router.delete('/:id', courseController.deleteCourse);

export const courseRoute = router;
