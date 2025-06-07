import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { UserRole } from '@prisma/client';

import { DeskService } from './desk.service';
import { Roles } from '../../common/interceptors/role.decorator';

import { DeskCreateDto } from './dtos/desk-create.dto';
import { ListQueryDto } from '../../common/dtos/list-query.dto';
import { DeskUpdateDto } from './dtos/desk-update.dto';
import { DeskCreateUpdateResponseDto } from './dtos/desk-create-response.dto';
import { DeskListResponse } from './dtos/desk-list-response.dto';

@ApiBearerAuth('access-token')
@Controller('desks')
export class DeskController {
  constructor(private service: DeskService) {}

  @ApiCreatedResponse({
    description: 'Desk successfully created.',
    type: DeskCreateUpdateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Roles(UserRole.ADMIN)
  @Post()
  async create(
    @Body() body: DeskCreateDto,
  ): Promise<DeskCreateUpdateResponseDto> {
    return await this.service.create(body);
  }

  @ApiCreatedResponse({
    description: 'Desk successfully query.',
    type: DeskListResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @Get()
  async findAll(@Query() query: ListQueryDto): Promise<DeskListResponse> {
    return await this.service.findAll(query);
  }

  @ApiCreatedResponse({
    description: 'Desk successfully updated.',
    type: DeskCreateUpdateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: DeskUpdateDto,
  ): Promise<DeskCreateUpdateResponseDto> {
    return await this.service.update(id, body);
  }

  @ApiCreatedResponse({ description: 'Desk successfully deleted.' })
  @ApiBadRequestResponse({ description: 'Invalid deskId.' })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.service.delete(id);
  }
}
