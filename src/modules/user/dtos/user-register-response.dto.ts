import { UserRole } from '@prisma/client';

export class UserRegisterResponseDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
