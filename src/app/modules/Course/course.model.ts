import { model, Schema, Types } from 'mongoose';
import {
  TCourse,
  TCourseAssign,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    unique: true,
    trim: true,
  },
  code: {
    type: Number,
    unique: true,
    trim: true,
  },
  credits: {
    type: Number,
    trim: true,
  },
  preRequisiteCourses: [preRequisiteCourseSchema],

  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const courseAssignSchema = new Schema<TCourseAssign>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  faculty: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

courseSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
courseSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const CourseModel = model<TCourse>('course', courseSchema);
export const courseAssignModel = model<TCourseAssign>(
  'courseAssign',
  courseAssignSchema,
);
