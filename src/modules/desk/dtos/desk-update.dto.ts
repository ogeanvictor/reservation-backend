import { DeskStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class DeskUpdateDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  quantity: number;

  @IsOptional()
  @IsEnum(DeskStatus)
  status: DeskStatus;
}
