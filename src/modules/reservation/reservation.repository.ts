import { Injectable } from '@nestjs/common';

import { Prisma, Reservation, ReservationStatus } from '@prisma/client';
import { PrismaService } from '../../config/database.service';

import { ReservationRepositoryInterface } from './interfaces/reservation.repository.interface';

import { ReservationCreateUpdateResponse } from './dtos/reservation-create-update-response.dto';
import { ReservationCreateDto } from './dtos/reservation-create.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';
import { ReservationListResponse } from './dtos/reservation-list-response.dto';

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

  async findAll(queryParams: ListQueryDto): Promise<ReservationListResponse> {
    const {
      page = 0,
      itemsPerPage = 20,
      query,
      filter,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = queryParams;

    const allowedFilters = ['date'];

    const whereParams: Prisma.ReservationWhereInput = {};

    if (filter && query && allowedFilters.includes(filter)) {
      whereParams[filter] = {
        contains: query,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const reservations: Reservation[] = await this.prisma.reservation.findMany({
      where: whereParams,
      skip: page * itemsPerPage,
      take: itemsPerPage,
      orderBy: {
        [sortBy]: sortOrder.toLocaleLowerCase(),
      },
    });

    const total: number = await this.prisma.reservation.count({
      where: whereParams,
    });

    return {
      reservations,
      total,
    };
  }

  async findByUser(userId: string): Promise<ReservationListResponse> {
    const reservations: Reservation[] = await this.prisma.reservation.findMany({
      where: { userId },
    });

    const total: number = await this.prisma.reservation.count({
      where: { userId },
    });

    return {
      reservations,
      total,
    };
  }

  async cancelReservation(
    id: string,
    userId: string,
  ): Promise<Reservation | void> {
    const reservation: Reservation | null =
      await this.prisma.reservation.findUnique({
        where: { id, AND: { userId } },
      });

    if (reservation) {
      return await this.prisma.reservation.update({
        where: { id: reservation?.id },
        data: { status: ReservationStatus.DISABLED },
      });
    }
  }

  async findWhereDate(deskId: string, date: Date): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: { deskId, AND: { date: new Date(date) } },
    });
  }
}
