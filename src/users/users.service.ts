import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './_utils/dto/create-user.dto';
import { UsersMapper } from './users.mapper';
import { UpdateUserMacroDto } from './_utils/dto/update-user-macro.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersMapper: UsersMapper,
  ) {}

  async getUserById(userId: number) {
    const user = await this.usersRepository.getUserByIdOrThrow(userId);

    return this.usersMapper.toGetUserDto(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.createUser(createUserDto);

    return this.usersMapper.toGetUserDto(user);
  }

  async updateUserMacroGoals(
    userId: number,
    updateUserMacroDto: UpdateUserMacroDto,
  ) {
    const user = await this.usersRepository.updateUserMacroGoals(
      userId,
      updateUserMacroDto,
    );
    return this.usersMapper.toGetUserDto(user);
  }

  async deleteUser(userId: number) {
    return this.usersRepository.deleteUser(userId);
  }
}
