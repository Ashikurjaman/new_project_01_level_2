import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

AcademicFacultySchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isDepartmentExists) {
    throw new Error('Department Already Exists');
  }
  next();
});

AcademicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicFaculty.findOne(query);
  if (!isDepartmentExists) {
    throw new Error('Department does not Exists');
  }
  next();
});
export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  AcademicFacultySchema,
);
