import { Injectable } from '@nestjs/common';

import { DeskRepository } from './desk.repository';

import { DeskCreateDto } from './dtos/desk-create.dto';
import { DeskCreateResponseDto } from './dtos/desk-create-response.dto';

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
}
