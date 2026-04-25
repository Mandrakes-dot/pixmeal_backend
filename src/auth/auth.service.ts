import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { UsersMapper } from '../users/users.mapper';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AppleLoginDto } from './_utils/dto/apple-login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersMapper: UsersMapper,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      appleSub: user.appleSub,
    };

    return this.jwtService.signAsync(payload);
  }

  async loginWithApple(dto: AppleLoginDto) {
    const appleSub = this.extractAppleSub(dto.identityToken);

    let user = await this.usersRepository.findByAppleSub(appleSub);

    if (!user) {
      user = await this.usersRepository.createUser({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        weight: dto.weight,
        height: dto.height,
        goalType: dto.goalType,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth,
        macroGoal: dto.macroGoal,
        appleSub,
      });
    }

    const accessToken = await this.generateAccessToken(user);

    return {
      accessToken,
      user: this.usersMapper.toGetUserDto(user),
    };
  }

  private extractAppleSub(identityToken: string): string {
    try {
      const decoded = jwt.decode(identityToken);

      if (!decoded || typeof decoded === 'string' || !decoded.sub) {
        throw new UnauthorizedException('INVALID_APPLE_TOKEN');
      }

      return decoded.sub;
    } catch {
      throw new UnauthorizedException('INVALID_APPLE_TOKEN');
    }
  }
}
