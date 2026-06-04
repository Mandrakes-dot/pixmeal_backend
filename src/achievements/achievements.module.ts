import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsRepository } from './achievements.repository';
import { AchievementsMapper } from './achievements.mapper';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AchievementsController],
  providers: [
    AchievementsService,
    AchievementsRepository,
    AchievementsMapper,
    PrismaService,
  ],
  exports: [AchievementsService, AchievementsRepository, AchievementsMapper],
})
export class AchievementsModule {}
