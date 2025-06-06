import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@prisma/client';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { AuthLoginResponse } from './dtos/auth-login-response.dto';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  const mockLogin: AuthLoginDto = {
    email: 'teste@teste.com',
    password: '123456',
  };

  const mockLoginResponse: AuthLoginResponse = {
    token: 'token_fake',
    user: {
      id: '2dbd1a40-6c9c-4158-a8e9-6efecfe348b9',
      name: 'Test User',
      email: 'test@example.com',
      role: 'ADMIN',
    },
  };

  const mockUserResponse: User = {
    id: '2dbd1a40-6c9c-4158-a8e9-6efecfe348b9',
    name: 'Test User',
    email: 'test@example.com',
    password: '$2b$10$NI9IftegXWnwR1nUJ7e9OOMcjVA5uMOAtZRACc7OQm5t9DIb/F51m',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn().mockResolvedValue(mockLoginResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService) as jest.Mocked<AuthService>;
  });

  it('should be able to login with sucessfully', async () => {
    service.login.mockResolvedValue(mockLoginResponse);

    const result = await controller.login(mockLogin);

    expect(result).toEqual(mockLoginResponse);
    expect(service.login).toHaveBeenCalledWith(mockLogin);
  });

  it('should not be able to login with wrong email', async () => {
    service.login.mockRejectedValue(
      new UnauthorizedException('Email ou senha inválidos!'),
    );

    await expect(service.login(mockLogin)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(service.login).toHaveBeenCalledWith(mockLogin);
  });
});
