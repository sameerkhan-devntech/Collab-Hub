import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  filename!: string;

  @IsString()
  @IsNotEmpty()
  url!: string;

  @Type(() => Number)  // transforms "1" → 1
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @Type(() => Number)  // transforms "1" → 1
  @IsInt()
  @IsNotEmpty()
  projectId!: number;
}
