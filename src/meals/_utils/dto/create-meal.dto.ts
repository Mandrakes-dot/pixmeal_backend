import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { MealEntryType } from '@prisma/client';

export class CreateMealDto {
  @IsDateString()
  @IsOptional()
  entryDate?: string;

  @IsEnum(MealEntryType)
  entryType: MealEntryType;

  @IsNumber()
  @IsOptional()
  totalCalories?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  confidenceScore?: number;

  @IsNumber()
  @IsOptional()
  proteins?: number;

  @IsNumber()
  @IsOptional()
  carbs?: number;

  @IsNumber()
  @IsOptional()
  fat?: number;

  @IsInt()
  @IsOptional()
  photoFileId?: number;
}
