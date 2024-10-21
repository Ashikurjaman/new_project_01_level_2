import { z } from 'zod';
import { Days } from './offerCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(
        time => {
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        { message: 'Invalid time format expected 24 hours format' },
      ), // HH: MM   00-23: 00-59
      endTime: z.string().refine(
        time => {
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        { message: 'Invalid time format expected 24 hours format' },
      ), // HH: MM   00-23: 00-59,
    })
    .refine(
      body => {
        const date = new Date();
        const start = `${date.getFullYear}-${date.getMonth}-${date.getDay}T${body.startTime} `;
        const end = `${date.getFullYear}-${date.getMonth}-${date.getDay}T${body.endTime} `;
        return start < end;
      },
      {
        message: 'Start date should be before end time ',
      },
    ),
});
const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z.string().optional(), // HH: MM   00-23: 00-59
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
