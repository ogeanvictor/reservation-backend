import { UserRole } from '@prisma/client';

export class AuthLoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}
