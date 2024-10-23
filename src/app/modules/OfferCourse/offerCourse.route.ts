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
router.patch(
  '/id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferCourseController.updateOfferedCourse,
);
router.get('/id', OfferCourseController.getSingleOfferCourse);
router.delete('/id', OfferCourseController.deleteOfferCourse);
router.get('/', OfferCourseController.getallOfferCourse);

export const offerCourseRoute = router;
