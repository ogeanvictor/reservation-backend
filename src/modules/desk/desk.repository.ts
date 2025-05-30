import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/config/database.service';

import { DeskRepositoryInterface } from './interfaces/desk.repository.interface';

import { DeskCreateResponseDto } from './dtos/desk-create-response.dto';
import { DeskCreateDto } from './dtos/desk-create.dto';

@Injectable()
export class DeskRepository implements DeskRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(body: DeskCreateDto): Promise<DeskCreateResponseDto> {
    return await this.prisma.desk.create({ data: body });
  }
}
