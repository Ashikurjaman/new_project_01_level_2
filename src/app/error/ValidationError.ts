import mongoose from 'mongoose';
import { TErrorResource } from '../interface/interface';

export const handelValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSource: TErrorResource = Object.values(err.errors).map(val => {
    return {
      path: val.name,
      message: val.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};
