import { z } from 'zod';

const academicDepartmentValidateSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department name Must be String',
      required_error: 'Name Must be required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty name Must be String',
      required_error: 'Faculty Must be required',
    }),
  }),
});
const updateAcademicDepartmentValidateSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department name Must be String',
        required_error: 'Name Must be required',
      })
      .optional(),
    academicDepartment: z
      .string({
        invalid_type_error: 'Academic faculty name Must be String',
        required_error: 'Faculty Must be required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidate = {
  academicDepartmentValidateSchema,
  updateAcademicDepartmentValidateSchema,
};
