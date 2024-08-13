import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  months,
} from './academicSemester.constant';

const academicValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
  }),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
  year: z.date(),
  startMonth: z.enum([...months] as [string, ...string[]]),
  endMonth: z.enum([...months] as [string, ...string[]]),
});

export const AcademicSemesterValidation = {
  academicValidationSchema,
};
