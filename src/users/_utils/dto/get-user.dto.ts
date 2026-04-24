import { Gender, GoalType } from '@prisma/client';

export class MacroGoalDto {
  caloriesPerDay: number;
  proteins: number;
  carbs: number;
  fat: number;
}

export class GetUserDto {
  id: number;
  firstName: string;
  lastName: string;

  email?: string;
  appleSub?: string;

  dateOfBirth?: string;

  weight?: number;
  height?: number;

  goalType?: GoalType;
  gender?: Gender;

  macroGoal?: MacroGoalDto;

  createdAt: string;
  updatedAt: string;
}
