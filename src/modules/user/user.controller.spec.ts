import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserRegisterResponseDto } from './dtos/user-register-response.dto';
import { UserRegisterDto } from './dtos/user-register.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  const mockNewUser: UserRegisterDto = {
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    role: 'ADMIN',
  };

  const mockUserResponse: UserRegisterResponseDto = {
    id: '2dbd1a40-6c9c-4158-a8e9-6efecfe348b9',
    name: 'Test User',
    email: 'test@example.com',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockUserService = {
      register: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService) as jest.Mocked<UserService>;
  });

  it('should be able to register a new user', async () => {
    service.register.mockResolvedValue(mockUserResponse);

    const result = await controller.register(mockNewUser);

    expect(result).toEqual(mockUserResponse);
    expect(service.register).toHaveBeenCalledWith(mockNewUser);
  });

  it('should not be able to register a new user with email duplicated', async () => {
    service.register.mockRejectedValue(
      new ConflictException('Usuário com e-mail já cadastrado.'),
    );

    await expect(controller.register(mockNewUser)).rejects.toThrow(
      ConflictException,
    );
    expect(service.register).toHaveBeenCalledWith(mockNewUser);
  });
});
