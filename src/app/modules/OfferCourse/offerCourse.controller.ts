import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendRespond';
import { OfferCourseServices } from './offerCourse.services';

const CreateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferCourseServices.CreateOfferedCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer Course is created successfully 😆',
    data: result,
  });
});
const updateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferCourseServices.updateOfferedCourse(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer Course is created successfully 😆',
    data: result,
  });
});
const getallOfferCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferCourseServices.getAllOfferCourse(req.params);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Offer Course is retrieve successfully 😆',
    data: result,
  });
});
const getSingleOfferCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferCourseServices.getSingleOfferCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer Course is retrieve successfully 😆',
    data: result,
  });
});
const deleteOfferCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferCourseServices.deleteOfferCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer Course is retrieve successfully 😆',
    data: result,
  });
});

export const OfferCourseController = {
  CreateOfferedCourse,
  updateOfferedCourse,
  getallOfferCourse,
  getSingleOfferCourse,
  deleteOfferCourse,
};
