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
  import { ProjectService } from './projects.service.js';
  import { CreateProjectDto } from './dto/create-project.dto.js';
  import { UpdateProjectDto } from './dto/update-project.dto.js';
  
  @Controller('projects')
  export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}
  
    // CREATE -------------------------------------------------------
    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
      return this.projectService.create(createProjectDto);
    }
  
    // GET ALL ------------------------------------------------------
    @Get()
    async findAll() {
      return this.projectService.findAll();
    }
  
    // GET ONE ------------------------------------------------------
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.projectService.findOne(id);
    }
  
    // UPDATE -------------------------------------------------------
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateProjectDto: UpdateProjectDto,
    ) {
      return this.projectService.update(id, updateProjectDto);
    }
  
    // DELETE -------------------------------------------------------
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
      await this.projectService.remove(id);
    }
  }
  