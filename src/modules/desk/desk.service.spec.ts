import { Test, TestingModule } from '@nestjs/testing';

import { DeskRepository } from './desk.repository';
import { DeskService } from './desk.service';

import { DeskCreateUpdateResponseDto } from './dtos/desk-create-response.dto';
import { DeskCreateDto } from './dtos/desk-create.dto';
import { DeskListResponse } from './dtos/desk-list-response.dto';
import { DeskUpdateDto } from './dtos/desk-update.dto';

describe('DeskService', () => {
  let service: DeskService;
  let repository: jest.Mocked<DeskRepository>;

  const mockNewDesk: DeskCreateDto = {
    name: 'Mesa Test',
    quantity: 2,
    status: 'AVAILABLE',
  };

  const mockDeskResponse: DeskCreateUpdateResponseDto = {
    id: '',
    name: 'Mesa Test',
    quantity: 2,
    status: 'AVAILABLE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDeskListResponse: DeskListResponse = {
    total: 1,
    desks: [mockDeskResponse],
  };

  const mockDeskUpdate: DeskUpdateDto = {
    name: 'Mesa Test 2',
    quantity: 2,
    status: 'AVAILABLE',
  };

  beforeEach(async () => {
    const mockDeskRepository = {
      create: jest.fn().mockResolvedValue(mockDeskResponse),
      findAll: jest.fn().mockResolvedValue(mockDeskListResponse),
      update: jest.fn().mockResolvedValue(mockDeskUpdate),
      delete: jest.fn().mockResolvedValue('Mesa id_fake deletada com sucesso!'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeskService,
        {
          provide: DeskRepository,
          useValue: mockDeskRepository,
        },
      ],
    }).compile();

    service = module.get<DeskService>(DeskService);
    repository = module.get(DeskRepository) as jest.Mocked<DeskRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new desk', async () => {
    repository.create.mockResolvedValueOnce(mockDeskResponse);

    const result = await service.create(mockNewDesk);

    expect(result).toEqual(mockDeskResponse);
  });

  it('should be able to return a list of desks', async () => {
    const result = await service.findAll({ page: 0 });

    expect(result).toEqual(mockDeskListResponse);
    expect(repository.findAll).toHaveBeenCalledWith({ page: 0 });
  });

  it('should be able to update a desk with sucessfully', async () => {
    repository.update.mockResolvedValueOnce(mockDeskResponse);

    const result = await service.update(mockDeskResponse.id, mockDeskUpdate);

    expect(result).toEqual(mockDeskResponse);
  });

  it('should throw NotFoundException when update fails with P2025 error code', async () => {
    repository.update.mockRejectedValueOnce({ code: 'P2025' });

    await expect(
      service.update(mockDeskResponse.id, mockDeskUpdate),
    ).rejects.toThrow('Mesa não encontrada.');
  });

  it('should be able to delete a desk with sucessfully', async () => {
    const result = await service.delete('id_fake');

    expect(result).toEqual(`Mesa id_fake deletada com sucesso!`);
  });

  it('should throw NotFoundException when delete fails with P2025 error code', async () => {
    repository.delete.mockRejectedValueOnce({ code: 'P2025' });

    await expect(service.delete(mockDeskResponse.id)).rejects.toThrow(
      'Mesa não encontrada.',
    );
  });
});
