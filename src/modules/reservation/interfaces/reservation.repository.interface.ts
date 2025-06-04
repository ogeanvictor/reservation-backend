import { Reservation } from '@prisma/client';
import { ReservationCreateUpdateResponse } from '../dtos/reservation-create-update-response.dto';
import { ReservationCreateDto } from '../dtos/reservation-create.dto';

export abstract class ReservationRepositoryInterface {
  abstract create(
    body: ReservationCreateDto,
  ): Promise<ReservationCreateUpdateResponse>;
  abstract findWhereDate(desk: string, date: Date): Promise<Reservation[]>;
}
