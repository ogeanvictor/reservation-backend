import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '@prisma/client';

export class ReservationCreateUpdateResponse {
  @ApiProperty({
    example: 'bb8f44bc-bfea-4c97-9084-7eb9caa0abc7',
    description: 'Reservation Id',
  })
  id: string;

  @ApiProperty({
    example: '2025-03-06T13:30:00.000Z',
    description: 'Reservation date',
  })
  date: Date;

  @ApiProperty({
    example: 'ENABLED',
    description: 'Reservation status',
  })
  status: ReservationStatus;

  @ApiProperty({
    example: '2025-05-30T14:38:56.927Z',
    description: 'Reservation createdAt',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-05-30T14:38:56.927Z',
    description: 'Reservation updatedAt',
  })
  updatedAt: Date;
}
