import { semesterStatus } from './semester.constant';
import { TSemesterRegistration } from './semester.interface';
import { model, Schema } from 'mongoose';

const semesterSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: semesterStatus,
      default: 'UPCOMING',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
    },
    maxCredit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterModel = model<TSemesterRegistration>(
  'Semester',
  semesterSchema,
);
