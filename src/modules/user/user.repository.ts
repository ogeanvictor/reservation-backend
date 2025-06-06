import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../config/database.service';

import { UserRepositoryInterface } from './interface/user.repository.interface';

import { UserRegisterResponseDto } from './dtos/user-register-response.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { User } from '@prisma/client';

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

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}
