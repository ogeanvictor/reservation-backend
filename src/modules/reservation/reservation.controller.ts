import { Body, Controller, Post } from '@nestjs/common';

import { ReservationService } from './reservation.service';

import { ReservationCreateDto } from './dtos/reservation-create.dto';
import { ReservationCreateUpdateResponse } from './dtos/reservation-create-update-response.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private service: ReservationService) {}

  @Post()
  async create(
    @Body() body: ReservationCreateDto,
  ): Promise<ReservationCreateUpdateResponse> {
    console.log(body);
    return await this.service.create(body);
  }
}
