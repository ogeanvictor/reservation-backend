import { Desk } from '@prisma/client';

export class DeskListResponse {
  desks: Desk[];
  total: number;
}
