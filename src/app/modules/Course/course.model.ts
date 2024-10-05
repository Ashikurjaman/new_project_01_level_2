import { model, Schema, Types } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

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
    default?: false,
  },
});

export const CourseModel = model<TCourse>('course', courseSchema);