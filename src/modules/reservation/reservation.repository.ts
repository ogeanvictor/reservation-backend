import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/config/database.service';

import { ReservationRepositoryInterface } from './interfaces/reservation.repository.interface';

import { ReservationCreateUpdateResponse } from './dtos/reservation-create-update-response.dto';
import { ReservationCreateDto } from './dtos/reservation-create.dto';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationRepository implements ReservationRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(
    body: ReservationCreateDto,
  ): Promise<ReservationCreateUpdateResponse> {
    return await this.prisma.reservation.create({
      data: {
        date: new Date(body.date),
        quantity: body.quantity,
        user: {
          connect: { id: body.userId },
        },
        desk: {
          connect: { id: body.deskId },
        },
      },
    });
  }

  async findWhereDate(deskId: string, date: Date): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: { deskId, AND: { date: new Date(date) } },
    });
  }
}
