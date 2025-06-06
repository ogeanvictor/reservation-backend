import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';

import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';

import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthLoginResponse } from './dtos/auth-login-response.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<UserRepository>;
  let jwtService: jest.Mocked<JwtService>;

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
    const mockUserRepository = {
      findByEmail: jest.fn().mockResolvedValue(mockUserResponse),
    };

    const mockJwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(UserRepository) as jest.Mocked<UserRepository>;
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to login with succesfully', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(mockUserResponse);
    jwtService.signAsync.mockResolvedValue('token_fake');

    const result = await service.login(mockLogin);
    expect(result).toEqual(mockLoginResponse);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      id: mockUserResponse.id,
      email: mockUserResponse.email,
      role: mockUserResponse.role,
    });
  });

  it('should not be able to login with wrong email', async () => {
    userRepository.findByEmail.mockRejectedValueOnce(
      new UnauthorizedException('Email ou senha inválidos!'),
    );

    await expect(
      service.login({
        email: 'wrong@email.com',
        password: '123456',
      }),
    ).rejects.toThrow('Email ou senha inválidos!');
    expect(userRepository.findByEmail).toHaveBeenCalledWith('wrong@email.com');
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('should not be able to login with wrong password', async () => {
    userRepository.findByEmail.mockResolvedValue(mockUserResponse);

    jest.spyOn(bcrypt, 'compare').mockReturnValue();

    await expect(
      service.login({
        email: mockUserResponse.email,
        password: 'wrong_password',
      }),
    ).rejects.toThrow(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });
});
