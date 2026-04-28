import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './users.repository';
import { UsersMapper } from './users.mapper';

export const USER_MODEL = 'USER_MODEL';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository, UsersMapper],
  exports: [UsersService, PrismaService, UsersRepository, UsersMapper],
})
export class UsersModule {}
