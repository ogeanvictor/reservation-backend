import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';

import { UserRegisterDto } from './dtos/user-register.dto';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Post('register')
  async register(@Body() body: UserRegisterDto) {
    return await this.service.register(body);
  }
}
