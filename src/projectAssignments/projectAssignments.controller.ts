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
  import { ProjectAssignmentsService } from './projectAssignments.service.js';
  import { CreateProjectAssignmentDto } from './dto/create-pa.dto.js';
  import { UpdateProjectAssignmentDto } from './dto/update-pa.dto.js';
  
  @Controller('project-assignments')
  export class ProjectAssignmentsController {
    constructor(
      private readonly assignmentsService: ProjectAssignmentsService,
    ) {}
  
    // CREATE -------------------------------------------------------
    @Post()
    async create(
      @Body() createAssignmentDto: CreateProjectAssignmentDto,
    ) {
      return this.assignmentsService.create(createAssignmentDto);
    }
  
    // GET ALL ------------------------------------------------------
    @Get()
    async findAll() {
      return this.assignmentsService.findAll();
    }
  
    // GET ONE ------------------------------------------------------
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.assignmentsService.findOne(id);
    }
  
    // UPDATE -------------------------------------------------------
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateAssignmentDto: UpdateProjectAssignmentDto,
    ) {
      return this.assignmentsService.update(id, updateAssignmentDto);
    }
  
    // DELETE -------------------------------------------------------
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
      await this.assignmentsService.remove(id);
    }
  }
  