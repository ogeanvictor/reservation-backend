import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Desk, DeskStatus, Reservation } from '@prisma/client';
import { ReservationRepository } from './reservation.repository';
import { DeskRepository } from '../desk/desk.repository';

import { ReservationCreateDto } from './dtos/reservation-create.dto';
import { ReservationCreateUpdateResponse } from './dtos/reservation-create-update-response.dto';
import { ReservationListResponse } from './dtos/reservation-list-response.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';

@Injectable()
export class ReservationService {
  constructor(
    private repository: ReservationRepository,
    private deskRepository: DeskRepository,
  ) {}

  async create(
    body: ReservationCreateDto,
  ): Promise<ReservationCreateUpdateResponse> {
    try {
      const desk: Desk | null = await this.deskRepository.findById(body.deskId);

      if (!desk) {
        throw new NotFoundException('Mesa não encontrada!');
      }

      if (
        desk.status === DeskStatus.DISABLED ||
        desk.status === DeskStatus.RESERVED
      ) {
        throw new ConflictException('Mesa não disponível!');
      }

      if (body.quantity > desk.quantity) {
        throw new ConflictException('Mesa não suporta o número de pessoas!');
      }

      const reservations: Reservation[] = await this.repository.findWhereDate(
        body.deskId,
        body.date,
      );

      if (reservations.length > 0) {
        throw new ConflictException('Mesa já reservada!');
      }

      await this.deskRepository.changeStatus(body.deskId, DeskStatus.RESERVED);

      return await this.repository.create(body);
    } catch (error: any) {
      throw error;
    }
  }

  async findAll(query: ListQueryDto): Promise<ReservationListResponse> {
    try {
      const reservations: ReservationListResponse =
        await this.repository.findAll(query);
      return reservations;
    } catch (error: any) {
      throw error;
    }
  }

  async findByUser(userId: string): Promise<ReservationListResponse> {
    try {
      const reservations: ReservationListResponse =
        await this.repository.findByUser(userId);
      return reservations;
    } catch (error: any) {
      throw error;
    }
  }

  async cancelReservation(id: string, userId: string): Promise<Reservation> {
    try {
      const reservation: Reservation | void =
        await this.repository.cancelReservation(id, userId);

      if (!reservation) {
        throw new ConflictException('Cancelamento não permitido!');
      }

      await this.deskRepository.changeStatus(
        reservation.deskId,
        DeskStatus.AVAILABLE,
      );

      return reservation;
    } catch (error: any) {
      throw error;
    }
  }
}
