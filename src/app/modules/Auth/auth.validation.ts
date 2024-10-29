import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id must be required' }),
    password: z.string({ required_error: 'password must be required' }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password must be required' }),
    newPassword: z.string({ required_error: 'password must be required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookie: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token required',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
