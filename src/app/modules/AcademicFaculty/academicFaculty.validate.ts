import { z } from 'zod';

const academicFacultyValidateSchema = z.object({});
const updateAcademicFacultyValidateSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});

export const academicFacultyValidation = {
  academicFacultyValidateSchema,
  updateAcademicFacultyValidateSchema,
};
