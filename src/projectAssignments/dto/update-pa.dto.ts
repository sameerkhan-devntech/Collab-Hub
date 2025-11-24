import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectAssignmentDto } from './create-pa.dto.js';

export class UpdateProjectAssignmentDto extends PartialType(
  CreateProjectAssignmentDto,
) {}
