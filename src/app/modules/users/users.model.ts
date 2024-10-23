<<<<<<< HEAD
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './users.interface';
=======
/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './users.interface';
>>>>>>> d451b20c80105bfe0ec156e99cd02742fd04ed34
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
    },
    needsPasswordsChange: {
      type: Boolean,
      default: true,
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

<<<<<<< HEAD
export const User = model<TUser>('User', userSchema);
=======
userSchema.statics.isUserExistsByCustomId = async function name(id: string) {
  return await User.findOne({ id });
};
userSchema.statics.isPasswordMatched = async function name(
  planePasswordText: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(planePasswordText, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
>>>>>>> d451b20c80105bfe0ec156e99cd02742fd04ed34
