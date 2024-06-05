import { model, Schema } from 'mongoose';
import { TUser } from './users.interface';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    needsPasswordsChange: {
      type: Boolean,
      default: true,
    },
    role: {
      enum: ['student', 'faculty', 'admin'],
      required: true,
    },
    status: {
      enum: ['in-progress', 'blocked'],
      required: true,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
