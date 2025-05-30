import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UserRole } from '@prisma/client';

import { DeskService } from './desk.service';
import { Roles } from 'src/common/interceptors/role.decorator';

import { DeskCreateDto } from './dtos/desk-create.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';

@Controller('desks')
export class DeskController {
  constructor(private service: DeskService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() body: DeskCreateDto) {
    return await this.service.create(body);
  }

  @Get()
  async findAll(@Query() query: ListQueryDto) {
    return await this.service.findAll(query);
  }
}
