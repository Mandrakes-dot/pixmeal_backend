import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUserMacroDto {
  @IsOptional()
  @IsNumber()
  caloriesPerDay?: number;

  @IsOptional()
  @IsNumber()
  proteins?: number;

  @IsOptional()
  @IsNumber()
  carbs?: number;

  @IsOptional()
  @IsNumber()
  fat?: number;
}
