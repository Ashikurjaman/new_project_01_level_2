import { Schema, model } from 'mongoose';
import { Student, UserName } from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name can not be more then 20 characters'],
    validate: function (value: string) {
      const firstName =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return firstName === value;
    },
  },
  middleName: {
    type: String,
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlphanumeric(value),
      message: '{VALUE} is not valid',
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name can not be more then 20 characters'],
    validate: function (value: string) {
      const firstName =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return firstName === value;
    },
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
    },
  },
  avatar: { type: String },
  presentAddress: { type: String, trim: true },
  paramentAddress: { type: String, trim: true },
  isActive: {
    type: String,
    enum: ['Active', 'UnActive'],
    required: true,
  },
});

// create model
export const StudentModel = model<Student>('Student', studentSchema);
