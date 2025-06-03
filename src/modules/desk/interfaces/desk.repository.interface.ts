import { ListQueryDto } from 'src/common/dtos/list-query.dto';
import { DeskCreateUpdateResponseDto } from '../dtos/desk-create-response.dto';
import { DeskCreateDto } from '../dtos/desk-create.dto';
import { DeskListResponse } from '../dtos/desk-list-response.dto';
import { DeskUpdateDto } from '../dtos/desk-update.dto';
import { Desk } from '@prisma/client';

export abstract class DeskRepositoryInterface {
  abstract create(body: DeskCreateDto): Promise<DeskCreateUpdateResponseDto>;
  abstract findAll(query: ListQueryDto): Promise<DeskListResponse>;
  abstract findById(id: string): Promise<Desk | null>;
  abstract update(
    id: string,
    body: DeskUpdateDto,
  ): Promise<DeskCreateUpdateResponseDto>;
  abstract delete(id: string): Promise<string>;
}
