import { Module } from '@nestjs/common';
import { MealEntriesController } from './mealentries.controller';
import { MealEntriesService } from './mealentries.service';

@Module({
  controllers: [MealEntriesController],
  providers: [MealEntriesService],
})
export class MealEntriesModule {}
