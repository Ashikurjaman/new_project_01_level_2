import { Model, Schema, model } from 'mongoose';
import { Student, UserName } from './student/student.interface';

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
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  contactNo: { type: String },
  emergencyContactNo: { type: String },
  bloodGroup: ['A+', 'A-', 'B-', 'B+', 'AB-', 'AB+'],
  email: { type: String, required: true },
  avatar: { type: String },
  presentAddress: { type: String },
  paramentAddress: { type: String },
  isActive: ['active', 'UnActive'],
});

// create model
export const StudentModel = model<Student>('Student', studentSchema);
