import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE -------------------------------------------------------
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, projectId, userId } = createTaskDto;

    return this.prisma.task.create({
      data: {
        title,
        description,
        status,
        projectId,
        userId,
      },
    });
  }

  // GET ALL ------------------------------------------------------
  async findAll() {
    return this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        project: true,
      },
    });
  }

  // GET ONE ------------------------------------------------------
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        user: true,
        project: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  // UPDATE ------------------------------------------------------
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.ensureExists(id);

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  // DELETE ------------------------------------------------------
  async remove(id: number) {
    await this.ensureExists(id);

    await this.prisma.task.delete({
      where: { id },
    });

    return;
  }

  // HELPER -------------------------------------------------------
  private async ensureExists(id: number) {
    const exists = await this.prisma.task.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
