import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsNumber,
  IsEnum,
  Min,
  ValidateNested,
} from 'class-validator';
import { Gender, GoalType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateMacroGoalDto {
  @IsNumber()
  @Min(0)
  caloriesPerDay: number;

  @IsNumber()
  @Min(0)
  proteins: number;

  @IsNumber()
  @Min(0)
  carbs: number;

  @IsNumber()
  @Min(0)
  fat: number;
}

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  appleSub?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsEnum(GoalType)
  goalType?: GoalType;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMacroGoalDto)
  macroGoal?: CreateMacroGoalDto;
}
