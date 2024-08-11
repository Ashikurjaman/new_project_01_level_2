import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonth,
} from './academicSemester.Interface';

const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

const academicSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },

    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: Date,
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

export const User = model<TAcademicSemester>(
  'AcademicSemester',
  academicSchema,
);
