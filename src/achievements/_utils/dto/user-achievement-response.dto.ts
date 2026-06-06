export class UserAchievementResponseDto {
  id: number;
  userId: number;
  achievementId: number;
  earnedAt: string;
  achievement: {
    id: number;
    name: string;
    description?: string;
  };
}
