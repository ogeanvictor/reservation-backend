import { Injectable } from '@nestjs/common';

import { Desk, Prisma } from '@prisma/client';

import { PrismaService } from 'src/config/database.service';

import { DeskRepositoryInterface } from './interfaces/desk.repository.interface';

import { DeskCreateResponseDto } from './dtos/desk-create-response.dto';
import { DeskCreateDto } from './dtos/desk-create.dto';
import { DeskListResponse } from './dtos/desk-list-response.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';

@Injectable()
export class DeskRepository implements DeskRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(body: DeskCreateDto): Promise<DeskCreateResponseDto> {
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
}
