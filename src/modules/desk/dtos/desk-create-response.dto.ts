import { ApiProperty } from '@nestjs/swagger';
import { DeskStatus } from '@prisma/client';

export class DeskCreateUpdateResponseDto {
  @ApiProperty({
    example: 'bb8f44bc-bfea-4c97-9084-7eb9caa0abc7',
    description: 'Desk Id',
  })
  id: string;

  @ApiProperty({
    example: 'Mesa 2',
    description: 'Desk name',
  })
  name: string;

  @ApiProperty({
    example: 2,
    description: 'Desk quantity',
  })
  quantity: number;

  @ApiProperty({
    example: 'Reserved',
    description: 'Desk status',
  })
  status: DeskStatus;

  @ApiProperty({
    example: '2025-05-30T14:38:56.927Z',
    description: 'Desk createdAt',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-05-30T14:38:56.927Z',
    description: 'Desk createdAt',
  })
  updatedAt: Date;
}
