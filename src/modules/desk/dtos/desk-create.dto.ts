import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { DeskStatus } from '@prisma/client';

export class DeskCreateDto {
  @ApiProperty({ example: 'Mesa 2', description: 'Name of desk' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 2, description: 'Quantity in desk' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  quantity: number;

  @ApiProperty({ example: 'AVAILABLE', description: 'Status of desk' })
  @IsNotEmpty()
  @IsEnum(DeskStatus)
  status: DeskStatus;
}
