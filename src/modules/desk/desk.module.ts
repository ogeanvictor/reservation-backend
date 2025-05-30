import { Module } from '@nestjs/common';

import { DeskController } from './desk.controller';
import { DeskService } from './desk.service';
import { DeskRepository } from './desk.repository';

@Module({
  imports: [],
  controllers: [DeskController],
  providers: [DeskService, DeskRepository],
})
export class DeskModule {}
