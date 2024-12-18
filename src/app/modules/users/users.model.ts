/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './users.interface';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordsChange: {
      type: Boolean,
      default: true,
    },
    needsPasswordsChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      required: true,
    },
    status: {
      type: String,
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

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExistsByCustomId = async function name(id: string) {
  return await User.findOne({ id }).select('+password');
};
userSchema.statics.isPasswordMatched = async function name(
  planePasswordText: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(planePasswordText, hashedPassword);
};
userSchema.statics.isPasswordChangeBeforeTokenIssued = function (
  passwordChangeBeforeIssueDate,
  passwordChangeAfterIssueDate,
) {
  const needTimeChangeFormate =
    new Date(passwordChangeBeforeIssueDate).getTime() / 1000;
  return needTimeChangeFormate > passwordChangeAfterIssueDate;
};

export const User = model<TUser, UserModel>('User', userSchema);
