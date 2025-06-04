import { Reservation } from '@prisma/client';
import { ReservationCreateUpdateResponse } from '../dtos/reservation-create-update-response.dto';
import { ReservationCreateDto } from '../dtos/reservation-create.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';
import { ReservationListResponse } from '../dtos/reservation-list-response.dto';

export abstract class ReservationRepositoryInterface {
  abstract create(
    body: ReservationCreateDto,
  ): Promise<ReservationCreateUpdateResponse>;
  abstract findAll(query: ListQueryDto): Promise<ReservationListResponse>;
  abstract findByUser(userId: string): Promise<ReservationListResponse>;
  abstract findWhereDate(desk: string, date: Date): Promise<Reservation[]>;
}
