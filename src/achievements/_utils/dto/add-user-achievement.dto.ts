import { IsNumber } from 'class-validator';

export class AddUserAchievementDto {
  @IsNumber()
  achievementId: number;
}
