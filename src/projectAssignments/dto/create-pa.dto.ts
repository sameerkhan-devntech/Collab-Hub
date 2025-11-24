import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProjectAssignmentDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  projectId!: number;
}
