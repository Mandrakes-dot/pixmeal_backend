import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MealEntriesController } from './mealentries.controller';
import { MealEntriesService } from './mealentries.service';

@Module({
  controllers: [MealEntriesController],
  providers: [MealEntriesService, PrismaService],
  exports: [MealEntriesService],
})
export class MealEntriesModule {}
