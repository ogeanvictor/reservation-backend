import { DeskStatus } from '@prisma/client';

export class DeskCreateResponseDto {
  id: string;
  name: string;
  quantity: number;
  status: DeskStatus;
  createdAt: Date;
  updatedAt: Date;
}
