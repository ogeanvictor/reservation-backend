import { UserRole } from '@prisma/client';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: UserRole;
    };
  }
}
