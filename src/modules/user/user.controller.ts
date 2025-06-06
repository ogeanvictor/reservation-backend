import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { Public } from '../../common/interceptors/auth.metadata';

import { UserRegisterDto } from './dtos/user-register.dto';
import { UserRegisterResponseDto } from './dtos/user-register-response.dto';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @ApiCreatedResponse({
    description: 'Register successfully.',
    type: UserRegisterResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Public()
  @Post('register')
  async register(
    @Body() body: UserRegisterDto,
  ): Promise<UserRegisterResponseDto> {
    return await this.service.register(body);
  }
}
