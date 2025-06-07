import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@prisma/client';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';

import { UserRegisterResponseDto } from './dtos/user-register-response.dto';
import { UserRegisterDto } from './dtos/user-register.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: '2dbd1a40-6c9c-4158-a8e9-6efecfe348b9',
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserResponse: UserRegisterResponseDto = {
    id: '2dbd1a40-6c9c-4158-a8e9-6efecfe348b9',
    name: 'Test User',
    email: 'test@example.com',
    role: 'ADMIN',
    createdAt: mockUser.createdAt,
    updatedAt: mockUser.updatedAt,
  };

  beforeEach(async () => {
    const mockUserRepository = {
      register: jest.fn().mockResolvedValue(mockUserResponse),
      findByEmail: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository) as jest.Mocked<UserRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to register a new user', async () => {
    const newUser: UserRegisterDto = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'ADMIN',
      password: '123456',
    };

    repository.register.mockResolvedValueOnce(mockUserResponse);

    const result = await service.register(newUser);
    expect(result).toEqual(mockUserResponse);
  });

  it('should not be able to register a new user with email duplicated', async () => {
    repository.findByEmail.mockResolvedValue({
      id: '2dbd1a40-6c9c-4158-a8e9-6efecfe348b9',
      email: 'existing@email.com',
    } as User);

    await expect(
      service.register({ email: 'existing@email.com' } as UserRegisterDto),
    ).rejects.toThrow('Usuário com e-mail já cadastrado.');

    expect(repository.findByEmail).toHaveBeenCalledWith('existing@email.com');
    expect(repository.register).not.toHaveBeenCalled();
  });
});
