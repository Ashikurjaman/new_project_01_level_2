import { Schema, model, connect } from 'mongoose';

interface Student {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B-' | 'B+' | 'AB-' | 'AB+';
  email: string;
  avatar?: string;
  presentAddress: string;
  paramentAddress: string;
}
