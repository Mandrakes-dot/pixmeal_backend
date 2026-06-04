import { Body, Controller, Post } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AddUserAchievementDto } from './_utils/dto/add-user-achievement.dto';
import { CurrentUser } from '../users/_utils/decorator/connecter-user.decorator';
import { Protect } from '../auth/decorators/protect.decorator';
import { User } from '@prisma/client';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post('user')
  @Protect()
  addUserAchievement(
    @Body() addUserAchievementDto: AddUserAchievementDto,
    @CurrentUser() user: User,
  ) {
    return this.achievementsService.addUserAchievement(
      user.id,
      addUserAchievementDto,
    );
  }
}
