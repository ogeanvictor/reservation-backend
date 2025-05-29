import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/config/database.service';

import { UserRepositoryInterface } from './interface/user.repository.interface';

import { UserRegisterResponseDto } from './dtos/user-register-response.dto';
import { UserRegisterDto } from './dtos/user-register.dto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async register(body: UserRegisterDto): Promise<UserRegisterResponseDto> {
    return await this.prisma.user.create({
      data: body,
      omit: {
        password: true,
      },
    });
  }
}
