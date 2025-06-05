import { ApiProperty } from '@nestjs/swagger';
import { Desk } from '@prisma/client';

export class DeskListResponse {
  @ApiProperty({
    example: 'Desk array',
    description: 'Desk array',
  })
  desks: Desk[];

  @ApiProperty({
    example: 20,
    description: 'Desk total',
  })
  total: number;
}
