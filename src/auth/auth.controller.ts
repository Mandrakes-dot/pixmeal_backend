
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppleLoginDto } from './_utils/dto/apple-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('apple')
  loginWithApple(@Body() dto: AppleLoginDto) {
    return this.authService.loginWithApple(dto);
  }
}
