import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMealDto } from './_utils/dto/create-meal.dto';

@Injectable()
export class MealRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMeal(userId: number, dto: CreateMealDto) {
    return this.prismaService.$transaction(async (tx) => {
      const entryDate = dto.entryDate ? new Date(dto.entryDate) : new Date();
      const logDate = this.getStartOfDay(entryDate);

      const dailyLog = await tx.dailyNutritionLog.upsert({
        where: {
          userId_date: {
            userId,
            date: logDate,
          },
        },
        update: {},
        create: {
          userId,
          date: logDate,
        },
      });

      const mealEntry = await tx.mealEntry.create({
        data: {
          userId,
          dailyNutritionLogId: dailyLog.id,
          entryDate,
          entryType: dto.entryType,
          totalCalories: dto.totalCalories,
          weight: dto.weight,
          confidenceScore: dto.confidenceScore,
          proteins: dto.proteins,
          carbs: dto.carbs,
          fat: dto.fat,
          photoFileId: dto.photoFileId,
        },
        include: {
          photoFile: true,
          dailyNutritionLog: true,
        },
      });

      await tx.dailyNutritionLog.update({
        where: {
          id: dailyLog.id,
        },
        data: {
          totalCalories: {
            increment: dto.totalCalories ?? 0,
          },
          proteins: {
            increment: dto.proteins ?? 0,
          },
          carbs: {
            increment: dto.carbs ?? 0,
          },
          fat: {
            increment: dto.fat ?? 0,
          },
        },
      });

      return mealEntry;
    });
  }

  async findMealsByUserAndDate(userId: number, date: Date) {
    const startOfDay = this.getStartOfDay(date);
    const endOfDay = this.getEndOfDay(date);

    return this.prismaService.mealEntry.findMany({
      where: {
        userId,
        entryDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        entryDate: 'asc',
      },
      include: {
        photoFile: true,
      },
    });
  }

  async findMealById(userId: number, mealId: number) {
    return this.prismaService.mealEntry.findFirst({
      where: {
        id: mealId,
        userId,
      },
      include: {
        photoFile: true,
        dailyNutritionLog: true,
      },
    });
  }

  private getStartOfDay(date: Date): Date {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  private getEndOfDay(date: Date): Date {
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return end;
  }
}
