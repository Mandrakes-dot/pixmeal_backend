import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AchievementsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  addUserAchievement(userId: number, achievementId: number) {
    return this.prismaService.userAchievement.create({
      data: { userId, achievementId },
      include: { achievement: true },
    });
  }
}
