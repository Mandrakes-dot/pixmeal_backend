import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersMapper } from './users.mapper';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersMapper, PrismaService],
  exports: [UsersService, UsersRepository, UsersMapper],
})
export class UsersModule {}
