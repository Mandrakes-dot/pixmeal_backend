import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './_utils/dto/create-user.dto';
import { UpdateUserMacroDto } from './_utils/dto/update-user-macro.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //todo: implement current user

  @Get()
  getUserById() {
    return this.usersService.getUserById(1);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  //todo: implement current user and a guard (copy it from other project)
  //todo: replace userId with curent user when done

  @Put()
  updateUserMacroGoal(@Body() updateUserMacroDto: UpdateUserMacroDto) {
    return this.usersService.updateUserMacroGoals(1, updateUserMacroDto);
  }
}
