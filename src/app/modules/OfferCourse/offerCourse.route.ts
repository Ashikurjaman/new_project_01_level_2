import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offerCourse.validation';
import { OfferCourseController } from './offerCourse.controller';

const router = express.Router();

router.post(
  '/create-offer-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferCourseController.CreateOfferedCourse,
);

export const offerCourseRoute = router;
