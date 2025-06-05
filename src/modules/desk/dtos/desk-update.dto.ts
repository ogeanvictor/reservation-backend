import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { DeskStatus } from '@prisma/client';

export class DeskUpdateDto {
  @ApiProperty({ example: 'Mesa 2', description: 'Name of desk' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 2, description: 'Quantity in desk' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  quantity: number;

  @ApiProperty({ example: 'AVAILABLE', description: 'Status of desk' })
  @IsOptional()
  @IsEnum(DeskStatus)
  status: DeskStatus;
}
