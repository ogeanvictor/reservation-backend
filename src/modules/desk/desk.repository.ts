import { Injectable } from '@nestjs/common';

import { Desk, DeskStatus, Prisma } from '@prisma/client';

import { PrismaService } from 'src/config/database.service';

import { DeskRepositoryInterface } from './interfaces/desk.repository.interface';

import { DeskCreateUpdateResponseDto } from './dtos/desk-create-response.dto';
import { DeskCreateDto } from './dtos/desk-create.dto';
import { DeskListResponse } from './dtos/desk-list-response.dto';
import { DeskUpdateDto } from './dtos/desk-update.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';

@Injectable()
export class DeskRepository implements DeskRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(body: DeskCreateDto): Promise<DeskCreateUpdateResponseDto> {
    return await this.prisma.desk.create({ data: body });
  }

  async findAll(queryParams: ListQueryDto): Promise<DeskListResponse> {
    const {
      page = 0,
      itemsPerPage = 20,
      query,
      filter,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = queryParams;

    const allowedFilters = ['name'];

    const whereParams: Prisma.DeskWhereInput = {};

    if (filter && query && allowedFilters.includes(filter)) {
      whereParams[filter] = {
        contains: query,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const desks: Desk[] = await this.prisma.desk.findMany({
      where: whereParams,
      skip: page * itemsPerPage,
      take: itemsPerPage,
      orderBy: {
        [sortBy]: sortOrder.toLocaleLowerCase(),
      },
    });

    const total: number = await this.prisma.desk.count({ where: whereParams });

    return {
      desks,
      total,
    };
  }

  async findById(id: string): Promise<Desk | null> {
    return await this.prisma.desk.findUnique({ where: { id } });
  }

  async update(
    id: string,
    body: DeskUpdateDto,
  ): Promise<DeskCreateUpdateResponseDto> {
    return await this.prisma.desk.update({ where: { id }, data: body });
  }

  async changeStatus(id: string, status: DeskStatus): Promise<Desk> {
    return await this.prisma.desk.update({
      where: { id },
      data: { status: status },
    });
  }

  async delete(id: string): Promise<string> {
    await this.prisma.desk.delete({ where: { id } });
    return `Mesa ${id} deletada com sucesso!`;
  }
}
