import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma.service.js';
import { CreateProjectAssignmentDto } from './dto/create-pa.dto.js';
import { UpdateProjectAssignmentDto } from './dto/update-pa.dto.js';
import { ProjectAssignment } from '@prisma/client';

@Injectable()
export class ProjectAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE -------------------------------------------------------
  async create(
    createDto: CreateProjectAssignmentDto,
  ): Promise<ProjectAssignment> {
    const { userId, projectId } = createDto;

    return this.prisma.projectAssignment.create({
      data: {
        userId,
        projectId,
      },
    });
  }

  // GET ALL ------------------------------------------------------
  async findAll() {
    return this.prisma.projectAssignment.findMany({
      orderBy: { assignedAt: 'desc' },
      include: {
        user: true,
        project: true,
      },
    });
  }

  // GET ONE ------------------------------------------------------
  async findOne(id: number) {
    const assignment = await this.prisma.projectAssignment.findUnique({
      where: { id },
      include: {
        user: true,
        project: true,
      },
    });

    if (!assignment) {
      throw new NotFoundException(
        `ProjectAssignment with ID ${id} not found`,
      );
    }

    return assignment;
  }

  // UPDATE ------------------------------------------------------
  async update(
    id: number,
    updateDto: UpdateProjectAssignmentDto,
  ) {
    await this.ensureExists(id);

    return this.prisma.projectAssignment.update({
      where: { id },
      data: updateDto,
    });
  }

  // DELETE ------------------------------------------------------
  async remove(id: number) {
    await this.ensureExists(id);

    await this.prisma.projectAssignment.delete({
      where: { id },
    });

    return;
  }

  // HELPER -------------------------------------------------------
  private async ensureExists(id: number) {
    const exists = await this.prisma.projectAssignment.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(
        `ProjectAssignment with ID ${id} not found`,
      );
    }
  }
}
