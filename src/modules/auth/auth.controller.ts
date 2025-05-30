import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthLoginDto } from './dtos/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return await this.service.login(body);
  }
}
