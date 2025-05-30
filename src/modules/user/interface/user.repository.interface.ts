import { User } from '@prisma/client';
import { UserRegisterResponseDto } from '../dtos/user-register-response.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';

export abstract class UserRepositoryInterface {
  abstract register(body: UserRegisterDto): Promise<UserRegisterResponseDto>;
  abstract findByEmail(email: string): Promise<User | null>;
}
