import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  
  import { TaskService } from './tasks.service.js';
  import { CreateTaskDto } from './dto/create-task.dto.js';
  import { UpdateTaskDto } from './dto/update-task.dto.js';
  
  @Controller('tasks')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    // CREATE -------------------------------------------------------
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
      return this.taskService.create(createTaskDto);
    }
  
    // GET ALL ------------------------------------------------------
    @Get()
    async findAll() {
      return this.taskService.findAll();
    }
  
    // GET ONE ------------------------------------------------------
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.taskService.findOne(id);
    }
  
    // UPDATE -------------------------------------------------------
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      return this.taskService.update(id, updateTaskDto);
    }
  
    // DELETE -------------------------------------------------------
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
      await this.taskService.remove(id);
    }
  }
  