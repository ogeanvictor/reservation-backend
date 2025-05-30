import { DeskCreateResponseDto } from '../dtos/desk-create-response.dto';
import { DeskCreateDto } from '../dtos/desk-create.dto';

export abstract class DeskRepositoryInterface {
  abstract create(body: DeskCreateDto): Promise<DeskCreateResponseDto>;
}
