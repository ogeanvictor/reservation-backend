import { Injectable, NotFoundException } from '@nestjs/common';

import { DeskRepository } from './desk.repository';

import { DeskCreateDto } from './dtos/desk-create.dto';
import { DeskCreateUpdateResponseDto } from './dtos/desk-create-response.dto';
import { DeskListResponse } from './dtos/desk-list-response.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';
import { DeskUpdateDto } from './dtos/desk-update.dto';

@Injectable()
export class DeskService {
  constructor(private repository: DeskRepository) {}

  async create(body: DeskCreateDto): Promise<DeskCreateUpdateResponseDto> {
    try {
      const desk: DeskCreateUpdateResponseDto =
        await this.repository.create(body);
      return desk;
    } catch (error: any) {
      throw error;
    }
  }

  async findAll(query: ListQueryDto): Promise<DeskListResponse> {
    try {
      const desks: DeskListResponse = await this.repository.findAll(query);
      return desks;
    } catch (error: any) {
      throw error;
    }
  }

  async update(
    id: string,
    body: DeskUpdateDto,
  ): Promise<DeskCreateUpdateResponseDto> {
    try {
      const desk: DeskCreateUpdateResponseDto = await this.repository.update(
        id,
        body,
      );
      return desk;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Mesa não encontrada.');
      }
      throw error;
    }
  }
}
