import { Injectable } from '@nestjs/common';
import { MacroGoal, User } from '@prisma/client';
import { GetUserDto, MacroGoalDto } from './_utils/dto/get-user.dto';

type UserWithMacroGoal = User & {
  macroGoal: MacroGoal | null;
};

@Injectable()
export class UsersMapper {
  toMacroGoalDto(macroGoal: MacroGoal | null): MacroGoalDto | undefined {
    if (!macroGoal) return undefined;

    return {
      caloriesPerDay: macroGoal.caloriesPerDay,
      proteins: macroGoal.proteins,
      carbs: macroGoal.carbs,
      fat: macroGoal.fat,
    };
  }

  toGetUserDto(user: UserWithMacroGoal): GetUserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email ?? undefined,
      appleSub: user.appleSub ?? undefined,
      dateOfBirth: user.dateOfBirth?.toISOString(),
      weight: user.weight ?? undefined,
      height: user.height ?? undefined,
      goalType: user.goalType ?? undefined,
      gender: user.gender ?? undefined,
      macroGoal: this.toMacroGoalDto(user.macroGoal),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
