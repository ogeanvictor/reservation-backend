import { Body, Controller, Post } from '@nestjs/common';

import { DeskService } from './desk.service';

import { DeskCreateDto } from './dtos/desk-create.dto';

@Controller('desks')
export class DeskController {
  constructor(private service: DeskService) {}

  @Post()
  async create(@Body() body: DeskCreateDto) {
    return await this.service.create(body);
  }
}
