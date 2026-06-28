import { MealEntryType } from '@prisma/client';

export class CreateMealEntryDto {
  entryDate?: string;
  entryType?: MealEntryType;
  totalCalories?: number;
  weight?: number;
  confidenceScore?: number;
  proteins?: number;
  carbs?: number;
  fat?: number;
  photoFileId?: number;
}
