import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'Password Must be string',
    })
    .max(20, { message: 'Password can not more then 20 characters' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
