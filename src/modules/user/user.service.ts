import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './user.repository';

import { UserRegisterDto } from './dtos/user-register.dto';
import { UserRegisterResponseDto } from './dtos/user-register-response.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async register(body: UserRegisterDto): Promise<UserRegisterResponseDto> {
    try {
      const hashPassword: string = bcrypt.hashSync(body.password, 10);
      const user = await this.repository.register({
        ...body,
        password: hashPassword,
      });

      return user;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Usuário com e-mail já cadastrado.');
      }
      throw error;
    }
  }
}
