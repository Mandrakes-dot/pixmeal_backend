import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (await super.canActivate(context)) as boolean;
  }

  handleRequest<TUser>(
    err: Error | null,
    user: TUser | false,
    info: Error | undefined,
  ): TUser {
    if (info?.message === 'jwt expired') {
      throw new ForbiddenException('TOKEN_EXPIRED');
    }

    if (err || !user) {
      throw err || new UnauthorizedException('UNAUTHORIZED');
    }

    return user;
  }
}