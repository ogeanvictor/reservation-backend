import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';

import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

import { ReservationCreateUpdateResponse } from './dtos/reservation-create-update-response.dto';
import { ReservationCreateDto } from './dtos/reservation-create.dto';
import { ReservationListResponse } from './dtos/reservation-list-response.dto';
import { ListQueryDto } from 'src/common/dtos/list-query.dto';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: jest.Mocked<ReservationService>;

  const mockNewReservation: ReservationCreateDto = {
    date: new Date(),
    deskId: 'desk_id',
    userId: 'user_id',
    quantity: 2,
  };

  const mockReservationResponse: ReservationCreateUpdateResponse = {
    id: 'id_fake',
    date: new Date(),
    status: 'ENABLED',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockReservationListResponse: ReservationListResponse = {
    total: 1,
    reservations: [
      {
        id: 'id_fake',
        date: new Date(),
        status: 'ENABLED',
        userId: 'user_id',
        deskId: 'desk_id',
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  beforeEach(async () => {
    const mockReservationService = {
      create: jest.fn().mockResolvedValue(mockReservationResponse),
      findAll: jest.fn().mockResolvedValue(mockReservationListResponse),
      findByUser: jest.fn().mockResolvedValue(mockReservationListResponse),
      cancelReservation: jest.fn().mockResolvedValue(mockReservationResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        ReservationService,
        {
          provide: ReservationService,
          useValue: mockReservationService,
        },
      ],
    }).compile();

    controller = module.get(ReservationController);
    service = module.get(ReservationService) as jest.Mocked<ReservationService>;
  });

  it('should be able to create a new reservation', async () => {
    service.create.mockResolvedValue(mockReservationResponse);

    const result = await controller.create(mockNewReservation);

    expect(result).toEqual(mockReservationResponse);
    expect(service.create).toHaveBeenCalledWith(mockNewReservation);
  });

  it('should be able to return a list of reservations', async () => {
    const query: ListQueryDto = { page: 1 };

    const result = await controller.findAll(query);

    expect(service.findAll).toHaveBeenCalledWith(query);
    expect(result).toEqual(mockReservationListResponse);
  });

  it('should be able to return a list of reservations by user', async () => {
    const req = { user: { id: 'user1_id' } } as any;

    const result = await controller.findByUser(req);

    expect(service.findByUser).toHaveBeenCalledWith('user1_id');
    expect(result).toEqual(mockReservationListResponse);
  });

  it('should be able to cancel a reservation', async () => {
    const req = { user: { id: 'user1_id' } } as any;

    const result = await controller.cancelReservation('res1', req);

    expect(service.cancelReservation).toHaveBeenCalledWith('res1', 'user1_id');
    expect(result).toEqual(mockReservationResponse);
  });

  it('should throw ConflictException on cancelReservation error', async () => {
    const req = { user: { id: 'user1_id' } } as any;

    service.cancelReservation.mockRejectedValueOnce(
      new ConflictException('Cancelamento não permitido!'),
    );

    await expect(controller.cancelReservation('res1', req)).rejects.toThrow(
      ConflictException,
    );
    expect(service.cancelReservation).toHaveBeenCalledWith('res1', 'user1_id');
  });
});
