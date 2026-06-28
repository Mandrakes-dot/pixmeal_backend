import { Injectable, NotFoundException } from '@nestjs/common';
import { MealEntryType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { resolveAuthUserId } from '../_utils/resolve-auth-user-id';
import { CreateMealEntryDto } from './dto/create-meal-entry.dto';
import { UpdateMealEntryDto } from './dto/update-meal-entry.dto';

@Injectable()
export class MealEntriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(authUser: any) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    return this.prisma.mealEntry.findMany({
      where: { userId },
      orderBy: { entryDate: 'desc' },
      include: {
        photoFile: true,
      },
    });
  }

  async findOne(authUser: any, id: number) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    const mealEntry = await this.prisma.mealEntry.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        photoFile: true,
      },
    });

    if (!mealEntry) {
      throw new NotFoundException('Meal entry not found.');
    }

    return mealEntry;
  }

  async create(authUser: any, dto: CreateMealEntryDto) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    return this.prisma.mealEntry.create({
      data: {
        userId,
        entryDate: dto.entryDate ? new Date(dto.entryDate) : new Date(),
        entryType: dto.entryType ?? MealEntryType.SNACK,
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
      },
    });
  }

  async update(authUser: any, id: number, dto: UpdateMealEntryDto) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    await this.findOne(authUser, id);

    return this.prisma.mealEntry.update({
      where: { id },
      data: {
        entryDate: dto.entryDate ? new Date(dto.entryDate) : undefined,
        entryType: dto.entryType,
        totalCalories: dto.totalCalories,
        weight: dto.weight,
        confidenceScore: dto.confidenceScore,
        proteins: dto.proteins,
        carbs: dto.carbs,
        fat: dto.fat,
        photoFileId: dto.photoFileId,
        userId,
      },
      include: {
        photoFile: true,
      },
    });
  }

  async remove(authUser: any, id: number) {
    await this.findOne(authUser, id);

    await this.prisma.mealEntry.delete({
      where: { id },
    });

    return {
      deleted: true,
      id,
    };
  }
}