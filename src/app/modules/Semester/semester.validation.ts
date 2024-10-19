import { z } from 'zod';

const createSemesterValidationSchema = z.object({
  body: z.object({}),
});

export const semesterRegistrationValidation = {
  createSemesterValidationSchema,
};
