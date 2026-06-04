import { Injectable } from '@nestjs/common';
import { Achievement, UserAchievement } from '@prisma/client';
import { UserAchievementResponseDto } from './_utils/dto/user-achievement-response.dto';

type UserAchievementWithAchievement = UserAchievement & {
  achievement: Achievement;
};

@Injectable()
export class AchievementsMapper {
  toUserAchievementResponseDto(
    userAchievement: UserAchievementWithAchievement,
  ): UserAchievementResponseDto {
    return {
      id: userAchievement.id,
      userId: userAchievement.userId,
      achievementId: userAchievement.achievementId,
      earnedAt: userAchievement.earnedAt.toISOString(),
      achievement: {
        id: userAchievement.achievement.id,
        name: userAchievement.achievement.name,
        description: userAchievement.achievement.description ?? undefined,
      },
    };
  }
}
