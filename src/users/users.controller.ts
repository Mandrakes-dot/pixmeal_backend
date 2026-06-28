import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { Protect } from '../auth/decorators/protect.decorator';
import { UsersService } from './users.service';
import { UpdateCurrentUserDto } from './_utils/dto/update-current-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Protect()
  getMe(@Req() req: any) {
    return this.usersService.getMe(req.user);
  }

  @Put('me')
  @Protect()
  updateMe(@Req() req: any, @Body() dto: UpdateCurrentUserDto) {
    return this.usersService.updateMe(req.user, dto);
  }
}