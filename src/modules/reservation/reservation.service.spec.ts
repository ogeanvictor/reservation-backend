import { Test, TestingModule } from '@nestjs/testing';

import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';
import { DeskRepository } from '../desk/desk.repository';

import { ReservationCreateUpdateResponse } from './dtos/reservation-create-update-response.dto';
import { ReservationCreateDto } from './dtos/reservation-create.dto';
import { ReservationListResponse } from './dtos/reservation-list-response.dto';

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: jest.Mocked<ReservationRepository>;
  let deskRepository: jest.Mocked<DeskRepository>;

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

  const mockDeskResponse = {
    id: 'fake_id',
    name: 'Mesa Test',
    quantity: 2,
    status: 'AVAILABLE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockReservationRepository = {
      create: jest.fn().mockResolvedValue(mockReservationResponse),
      findAll: jest.fn().mockResolvedValue(mockReservationListResponse),
      findByUser: jest.fn().mockResolvedValue(mockReservationListResponse),
      cancelReservation: jest.fn().mockResolvedValue(mockReservationResponse),
      findWhereDate: jest.fn().mockResolvedValue([]),
    };

    const mockDeskRepository = {
      changeStatus: jest.fn().mockResolvedValue(mockDeskResponse),
      findById: jest.fn().mockResolvedValue(mockDeskResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: ReservationRepository,
          useValue: mockReservationRepository,
        },
        {
          provide: DeskRepository,
          useValue: mockDeskRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get(
      ReservationRepository,
    ) as jest.Mocked<ReservationRepository>;
    deskRepository = module.get(DeskRepository) as jest.Mocked<DeskRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new reservation', async () => {
    repository.create.mockResolvedValueOnce(mockReservationResponse);

    const result = await service.create(mockNewReservation);

    expect(repository.create).toHaveBeenCalled();
    expect(result).toEqual(mockReservationResponse);
  });

  it('should not be able to create a new reservation cause exist a reservation in the same desk and date', async () => {
    repository.findWhereDate.mockResolvedValue([
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
    ]);

    await expect(service.create(mockNewReservation)).rejects.toThrow(
      'Mesa já reservada!',
    );
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('shoul be able to return a list of reservation', async () => {
    const result = await service.findAll({ page: 0 });

    expect(result).toEqual(mockReservationListResponse);
    expect(repository.findAll).toHaveBeenCalledWith({ page: 0 });
  });

  it('should be able to return a list of user reservation', async () => {
    repository.findByUser.mockResolvedValueOnce(mockReservationListResponse);

    const result = await service.findByUser('user_id');

    expect(result).toEqual(mockReservationListResponse);
    expect(repository.findByUser).toHaveBeenCalled();
  });

  it('should be able to cancel reservation', async () => {
    repository.cancelReservation.mockResolvedValueOnce({
      id: 'id_fake',
      date: new Date(),
      status: 'DISABLED',
      userId: 'user_id',
      deskId: 'desk_id',
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.cancelReservation('id_fake', 'user_id');

    expect(result).toEqual({
      id: 'id_fake',
      date: new Date(),
      status: 'DISABLED',
      userId: 'user_id',
      deskId: 'desk_id',
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it('should not be able to cancel reservation cause reservation does not belong to the user', async () => {
    repository.cancelReservation.mockResolvedValue(undefined);

    await expect(
      service.cancelReservation('fake_id', 'user2_id'),
    ).rejects.toThrow('Cancelamento não permitido!');
  });
});
