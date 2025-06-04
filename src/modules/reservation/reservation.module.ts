import { Module } from '@nestjs/common';

import { DeskModule } from '../desk/desk.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ReservationRepository } from './reservation.repository';

@Module({
  imports: [DeskModule],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
