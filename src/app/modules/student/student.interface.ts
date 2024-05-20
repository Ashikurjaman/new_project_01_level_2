export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B-' | 'B+' | 'AB-' | 'AB+';
  email: string;
  avatar?: string;
  presentAddress: string;
  paramentAddress: string;
  isActive: 'Active' | 'UnActive';
};
