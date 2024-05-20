import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  middleName: Joi.string().trim(),
  lastName: Joi.string().trim().required(),
  // Add any other properties and validation rules you have in the userNameSchema
});
const studentJoiSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  contactNo: Joi.string().optional(),
  emergencyContactNo: Joi.string().optional(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B-', 'B+', 'AB-', 'AB+')
    .optional(),
  email: Joi.string().email().required(),
  avatar: Joi.string().optional(),
  presentAddress: Joi.string().trim().optional(),
  paramentAddress: Joi.string().trim().optional(),
  isActive: Joi.string().valid('Active', 'UnActive').required(),
});

export default studentJoiSchema;
