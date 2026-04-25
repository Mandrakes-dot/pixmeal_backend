import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserMacroDto } from './_utils/dto/update-user-macro.dto';
import { CurrentUser } from './_utils/decorator/connecter-user.decorator';
import { Protect } from '../auth/decorators/protect.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Protect()
  getMe(@CurrentUser() user: User) {
    return this.usersService.getUserById(user.id);
  }

  @Put('me/macro-goal')
  @Protect()
  updateUserMacroGoal(
    @Body() updateUserMacroDto: UpdateUserMacroDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.updateUserMacroGoals(user.id, updateUserMacroDto);
  }
}
