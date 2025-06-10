import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { UserRole } from '@prisma/client';

import { ReservationService } from './reservation.service';
import { Roles } from '../../common/interceptors/role.decorator';
import { AuthGuard } from '../auth/auth.guard';

import { ReservationCreateDto } from './dtos/reservation-create.dto';
import { ReservationCreateUpdateResponse } from './dtos/reservation-create-update-response.dto';
import { ListQueryDto } from '../../common/dtos/list-query.dto';
import { ReservationListResponse } from './dtos/reservation-list-response.dto';

@ApiBearerAuth('access-token')
@Controller('reservations')
export class ReservationController {
  constructor(private service: ReservationService) {}

  @ApiCreatedResponse({
    description: 'Reservation successfully created.',
    type: ReservationCreateUpdateResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Post()
  async create(
    @Body() body: ReservationCreateDto,
  ): Promise<ReservationCreateUpdateResponse> {
    return await this.service.create(body);
  }

  @ApiCreatedResponse({
    description: 'Reservation successfully query.',
    type: ReservationListResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @Roles(UserRole.ADMIN)
  @Get('/all')
  async findAll(
    @Query() query: ListQueryDto,
  ): Promise<ReservationListResponse> {
    return await this.service.findAll(query);
  }

  @ApiCreatedResponse({
    description: 'Reservation successfully query.',
    type: ReservationListResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @UseGuards(AuthGuard)
  @Get()
  async findByUser(@Req() req: Request): Promise<ReservationListResponse> {
    const user = req.user as { id: string };
    return await this.service.findByUser(user.id);
  }

  @ApiCreatedResponse({
    description: 'Reservation successfully canceled.',
    type: ReservationCreateUpdateResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @Patch(':id/cancel')
  async cancelReservation(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ReservationCreateUpdateResponse> {
    const user = req.user as { id: string };
    return await this.service.cancelReservation(id, user.id);
  }
}
