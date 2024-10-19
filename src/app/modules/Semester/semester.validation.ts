import { z } from 'zod';
import { semesterStatus } from './semester.constant';
import { string } from 'joi';

const createSemesterValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(semesterStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});
const updateSemesterValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum([...(semesterStatus as [string, ...string[]])]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const semesterRegistrationValidation = {
  createSemesterValidationSchema,
  updateSemesterValidationSchema,
};
