import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { DeskController } from './desk.controller';
import { DeskService } from './desk.service';

import { DeskCreateUpdateResponseDto } from './dtos/desk-create-response.dto';
import { DeskCreateDto } from './dtos/desk-create.dto';
import { DeskListResponse } from './dtos/desk-list-response.dto';
import { DeskUpdateDto } from './dtos/desk-update.dto';

describe('DeskController', () => {
  let controller: DeskController;
  let service: jest.Mocked<DeskService>;

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
    const mockDeskService = {
      create: jest.fn().mockResolvedValue(mockDeskResponse),
      findAll: jest.fn().mockResolvedValue(mockDeskListResponse),
      update: jest.fn().mockResolvedValue(mockDeskResponse),
      delete: jest.fn().mockResolvedValue('Mesa id_fake deletada com sucesso!'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeskController],
      providers: [
        DeskService,
        {
          provide: DeskService,
          useValue: mockDeskService,
        },
      ],
    }).compile();

    controller = module.get<DeskController>(DeskController);
    service = module.get(DeskService) as jest.Mocked<DeskService>;
  });

  it('should be able to create a new desk', async () => {
    service.create.mockResolvedValue(mockDeskResponse);

    const result = await controller.create(mockNewDesk);

    expect(result).toEqual(mockDeskResponse);
    expect(service.create).toHaveBeenCalledWith(mockNewDesk);
  });

  it('should be able to return a list of desks', async () => {
    service.findAll.mockResolvedValue(mockDeskListResponse);
    const result = await controller.findAll({ page: 0 });

    expect(result).toEqual(mockDeskListResponse);
    expect(service.findAll).toHaveBeenCalledWith({ page: 0 });
  });

  it('should be able to update a desk with sucessfully', async () => {
    service.update.mockResolvedValueOnce(mockDeskResponse);

    const result = await controller.update(mockDeskResponse.id, mockDeskUpdate);

    expect(result).toEqual(mockDeskResponse);
  });

  it('should throw NotFoundException when update fails with not found error', async () => {
    service.update.mockRejectedValue(
      new NotFoundException('Mesa não encontrada.'),
    );

    await expect(controller.update('1', mockDeskUpdate)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should be able to delete with sucessfully', async () => {
    const result = await controller.delete('id_fake');

    expect(result).toEqual(`Mesa id_fake deletada com sucesso!`);
  });

  it('should throw NotFoundException when delete fails with not found error', async () => {
    service.delete.mockRejectedValue(
      new NotFoundException('Mesa não encontrada.'),
    );

    await expect(controller.delete('1')).rejects.toThrow(NotFoundException);
  });
});
