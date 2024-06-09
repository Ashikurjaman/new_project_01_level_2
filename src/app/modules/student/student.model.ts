import { Schema, model } from 'mongoose';
import {
  Student,
  StudentMethods,
  StudentUserModel,
  UserName,
} from './student.interface';
import validator from 'validator';
import { string } from 'joi';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
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
    required: [true, 'Last name is required'],
    validate: function (value: string) {
      const firstName =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return firstName === value;
    },
  },
});

// create schema
const studentSchema = new Schema<Student, StudentUserModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: userNameSchema,
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    message: '{ VALUE } is not valid',
  },
  contactNo: { type: String },
  emergencyContactNo: { type: String },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B-', 'B+', 'AB-', 'AB+'],
  },
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
});

studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

// create model
export const StudentModel = model<Student, StudentUserModel>(
  'Student',
  studentSchema,
);
