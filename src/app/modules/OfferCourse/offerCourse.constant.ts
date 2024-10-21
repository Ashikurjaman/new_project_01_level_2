import { TSchedule } from './offerCourse.interface';

export const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const hasTimeConflict = (
  existingFacultySchedule: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of existingFacultySchedule) {
    const existsStartTime = new Date(`1970-10-18T${schedule.startTime}`);
    const existsEndTime = new Date(`1970-10-18T${schedule.endTime}`);
    const newStartTime = new Date(`1970-10-18T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-10-18T${newSchedule.endTime}`);

    if (newStartTime < existsEndTime && newEndTime > existsStartTime) {
      return true;
    }
  }
  return false;
};
