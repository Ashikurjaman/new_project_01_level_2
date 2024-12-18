/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  id: string;
  password: string;
  needsPasswordsChange: boolean;
  needsPasswordsChangeAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    planePasswordText: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isPasswordChangeBeforeTokenIssued(
    passwordChangeBeforeIssueDate: Date,
    passwordChangeAfterIssueDate: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
