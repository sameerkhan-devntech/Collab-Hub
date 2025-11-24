import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @Type(()=>Number)
  @IsInt()
  projectId!: number;

  @Type(()=>Number)
  @IsInt()
  userId!: number;
}
