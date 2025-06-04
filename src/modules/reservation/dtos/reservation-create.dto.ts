import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class ReservationCreateDto {
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  deskId: string;

  @IsDate()
  date: Date;
}
