import { Injectable } from '@nestjs/common';

import { DeskRepository } from './desk.repository';

import { DeskCreateDto } from './dtos/desk-create.dto';
import { DeskCreateResponseDto } from './dtos/desk-create-response.dto';
import { DeskListResponse } from './dtos/desk-list-response.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';

@Injectable()
export class DeskService {
  constructor(private repository: DeskRepository) {}

  async create(body: DeskCreateDto): Promise<DeskCreateResponseDto> {
    try {
      const desk: DeskCreateResponseDto = await this.repository.create(body);
      return desk;
    } catch (error: any) {
      throw error;
    }
  }

  async findAll(query: ListQueryDto): Promise<DeskListResponse> {
    try {
      const desks: DeskListResponse = await this.repository.findAll(query);
      return desks;
    } catch (error) {
      throw error;
    }
  }
}
