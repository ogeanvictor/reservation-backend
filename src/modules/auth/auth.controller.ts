import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthLoginDto } from './dtos/auth-login.dto';
import { Public } from 'src/common/interceptors/auth.metadata';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return await this.service.login(body);
  }
}
