import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

import { DeskStatus } from '@prisma/client';

export class DeskCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  quantity: number;

  @IsNotEmpty()
  @IsEnum(DeskStatus)
  status: DeskStatus;
}
