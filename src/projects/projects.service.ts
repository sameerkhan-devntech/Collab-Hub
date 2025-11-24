import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE -------------------------------------------------------
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name } = createProjectDto;

    return this.prisma.project.create({
      data: { name },
    });
  }

  // GET ALL ------------------------------------------------------
  async findAll() {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        files: true,
        projectAssignments: true,
        tasks: true,
      },
    });
  }

  // GET ONE ------------------------------------------------------
  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        files: true,
        projectAssignments: true,
        tasks: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  // UPDATE ------------------------------------------------------
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.ensureExists(id);

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  // DELETE -------------------------------------------------------
  async remove(id: number) {
    await this.ensureExists(id);

    await this.prisma.project.delete({
      where: { id },
    });

    return;
  }

  // HELPER -------------------------------------------------------
  private async ensureExists(id: number) {
    const exists = await this.prisma.project.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
