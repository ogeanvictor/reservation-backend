import { Reservation } from '@prisma/client';

export class ReservationListResponse {
  reservations: Reservation[];
  total: number;
}
