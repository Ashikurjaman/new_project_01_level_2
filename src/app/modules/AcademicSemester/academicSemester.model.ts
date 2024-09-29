import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.Interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  months,
} from './academicSemester.constant';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';

const academicSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },

    code: {
      type: String,

      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
academicSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Semester Already Exists !',
    );
  }
  next();
});

academicSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicSemester.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Semester  does not Exists',
    );
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSchema,
);
