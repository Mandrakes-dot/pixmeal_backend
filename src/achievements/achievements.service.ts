import { Injectable } from '@nestjs/common';
import { AchievementsRepository } from './achievements.repository';
import { AchievementsMapper } from './achievements.mapper';
import { AddUserAchievementDto } from './_utils/dto/add-user-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepository: AchievementsRepository,
    private readonly achievementsMapper: AchievementsMapper,
  ) {}

  async addUserAchievement(
    userId: number,
    addUserAchievementDto: AddUserAchievementDto,
  ) {
    const userAchievement =
      await this.achievementsRepository.addUserAchievement(
        userId,
        addUserAchievementDto.achievementId,
      );

    return this.achievementsMapper.toUserAchievementResponseDto(
      userAchievement,
    );
  }
}
