<<<<<<< HEAD
=======
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

>>>>>>> d451b20c80105bfe0ec156e99cd02742fd04ed34
export type TUser = {
  id: string;
  password: string;
  needsPasswordsChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
<<<<<<< HEAD
=======

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    planePasswordText: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
>>>>>>> d451b20c80105bfe0ec156e99cd02742fd04ed34
