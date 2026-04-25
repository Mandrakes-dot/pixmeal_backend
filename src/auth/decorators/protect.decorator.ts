import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';

export function Protect() {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
