import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './_utils/dto/create-user.dto';
import { UpdateUserMacroDto } from './_utils/dto/update-user-macro.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getUserByIdOrThrow(userId: number) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
      include: { macroGoal: true },
    });
  }

  createUser(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        appleSub: createUserDto.appleSub,
        weight: createUserDto.weight,
        height: createUserDto.height,
        goalType: createUserDto.goalType,
        gender: createUserDto.gender,

        dateOfBirth: createUserDto.dateOfBirth
          ? new Date(createUserDto.dateOfBirth)
          : undefined,

        macroGoal: createUserDto.macroGoal
          ? {
              create: {
                ...createUserDto.macroGoal,
              },
            }
          : undefined,
      },
      include: { macroGoal: true },
    });
  }

  updateUserMacroGoals(userId: number, updateUserMacroDto: UpdateUserMacroDto) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { ...updateUserMacroDto },
      include: { macroGoal: true },
    });
  }

  deleteUser(userId: number) {
    return this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
