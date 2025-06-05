import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationCreateDto {
  @ApiProperty({ example: 2, description: 'Quantity of reservations' })
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty({ example: 'user-123', description: 'ID of the user' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'desk-456', description: 'ID of the desk' })
  @IsNotEmpty()
  deskId: string;

  @ApiProperty({
    example: '2025-06-04T12:00:00Z',
    description: 'Date of reservation',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
