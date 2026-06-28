import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { resolveAuthUserId } from '../_utils/resolve-auth-user-id';
import { UpdateCurrentUserDto } from './_utils/dto/update-current-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(authUser: any) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        macroGoal: true,
        userAchievements: {
          include: {
            achievement: true,
          },
        },
        userPreferences: {
          include: {
            foodPreference: true,
          },
        },
      },
    });
  }

  async updateMe(authUser: any, dto: UpdateCurrentUserDto) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        weight: dto.weight,
        height: dto.height,
        goalType: dto.goalType,
        gender: dto.gender,
      },
      include: {
        macroGoal: true,
      },
    });
  }
}