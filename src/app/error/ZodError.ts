import { ZodError, ZodIssue } from 'zod';
import { TErrorResource } from '../interface/interface';

export const handelZodError = (err: ZodError) => {
  const errorSource: TErrorResource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSource,
  };
};
