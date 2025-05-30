import { ListQueryDto } from 'src/common/dtos/list-query.dto';
import { DeskCreateResponseDto } from '../dtos/desk-create-response.dto';
import { DeskCreateDto } from '../dtos/desk-create.dto';
import { DeskListResponse } from '../dtos/desk-list-response.dto';

export abstract class DeskRepositoryInterface {
  abstract create(body: DeskCreateDto): Promise<DeskCreateResponseDto>;
  abstract findAll(query: ListQueryDto): Promise<DeskListResponse>;
}
