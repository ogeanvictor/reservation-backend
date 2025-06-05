import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '@prisma/client';

export class ReservationListResponse {
  @ApiProperty({
    example: 'Reservation array',
    description: 'Reservation array',
  })
  reservations: Reservation[];

  @ApiProperty({
    example: 20,
    description: 'Reservation total',
  })
  total: number;
}
