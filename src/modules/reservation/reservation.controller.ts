import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UserRole } from '@prisma/client';

import { ReservationService } from './reservation.service';
import { Roles } from 'src/common/interceptors/role.decorator';

import { ReservationCreateDto } from './dtos/reservation-create.dto';
import { ReservationCreateUpdateResponse } from './dtos/reservation-create-update-response.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';
import { ReservationListResponse } from './dtos/reservation-list-response.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private service: ReservationService) {}

  @Post()
  async create(
    @Body() body: ReservationCreateDto,
  ): Promise<ReservationCreateUpdateResponse> {
    return await this.service.create(body);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(
    @Query() query: ListQueryDto,
  ): Promise<ReservationListResponse> {
    return await this.service.findAll(query);
  }
}
