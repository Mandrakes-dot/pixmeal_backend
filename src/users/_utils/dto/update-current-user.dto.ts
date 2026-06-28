import { Gender, GoalType } from '@prisma/client';

export class UpdateCurrentUserDto {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  weight?: number;
  height?: number;
  goalType?: GoalType;
  gender?: Gender;
}