import { Body, Controller, Post } from '@nestjs/common';

import { DeskService } from './desk.service';

import { DeskCreateDto } from './dtos/desk-create.dto';
import { Roles } from 'src/common/interceptors/role.decorator';
import { UserRole } from '@prisma/client';

@Controller('desks')
export class DeskController {
  constructor(private service: DeskService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() body: DeskCreateDto) {
    return await this.service.create(body);
  }
}
