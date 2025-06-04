import { ReservationStatus } from '@prisma/client';

export class ReservationCreateUpdateResponse {
  id: string;
  date: Date;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}
