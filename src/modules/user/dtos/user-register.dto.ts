import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';

import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({ example: 'John Due', description: 'Name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'email@email.com', description: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @IsNotEmpty()
  @Length(6, 18)
  password: string;

  @ApiProperty({ example: 'CLIENT', description: 'Role' })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
