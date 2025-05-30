import { DeskStatus } from '@prisma/client';

export class DeskCreateUpdateResponseDto {
  id: string;
  name: string;
  quantity: number;
  status: DeskStatus;
  createdAt: Date;
  updatedAt: Date;
}
