import { Schema, model } from 'mongoose';
import { Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// create schema
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: userNameSchema,
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    message: '{ VALUE } is not valid',
  },
  contactNo: { type: String },
  emergencyContactNo: { type: String },
  bloodGroup: ['A+', 'A-', 'B-', 'B+', 'AB-', 'AB+'],
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  presentAddress: { type: String },
  paramentAddress: { type: String },
  isActive: {
    type: String,
    enum: ['Active', 'UnActive'],
    required: true,
  },
});

// create model
export const StudentModel = model<Student>('Student', studentSchema);
