// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../lib/prisma.service.js';
// import { CreateFileDto } from './dto/create-file.dto.js';
// import { UpdateFileDto } from './dto/update-file.dto.js';
// import { File } from '@prisma/client';

// @Injectable()
// export class FileService {
//   constructor(private readonly prisma: PrismaService) {}

//   // CREATE -------------------------------------------------------
//   async create(createFileDto: CreateFileDto): Promise<File> {
//     const { filename, url, userId, projectId } = createFileDto;

//     return this.prisma.file.create({
//       data: { filename, url, userId, projectId },
//     });
//   }

//   // GET ALL ------------------------------------------------------
//   async findAll() {
//     return this.prisma.file.findMany({
//       orderBy: { uploadedAt: 'desc' },
//       include: {
//         user: true,
//         project: true,
//       },
//     });
//   }

//   // GET ONE ------------------------------------------------------
//   async findOne(id: number) {
//     const file = await this.prisma.file.findUnique({
//       where: { id },
//       include: {
//         user: true,
//         project: true,
//       },
//     });

//     if (!file) {
//       throw new NotFoundException(`File with ID ${id} not found`);
//     }

//     return file;
//   }

//   // UPDATE ------------------------------------------------------
//   async update(id: number, updateFileDto: UpdateFileDto) {
//     await this.ensureExists(id);

//     return this.prisma.file.update({
//       where: { id },
//       data: updateFileDto,
//     });
//   }

//   // DELETE -------------------------------------------------------
//   async remove(id: number) {
//     await this.ensureExists(id);

//     await this.prisma.file.delete({
//       where: { id },
//     });

//     return;
//   }

//   // HELPER: Ensure File Exists ----------------------------------
//   private async ensureExists(id: number) {
//     const exists = await this.prisma.file.findUnique({ where: { id } });

//     if (!exists) {
//       throw new NotFoundException(`File with ID ${id} not found`);
//     }
//   }
// }
// src/file/file.service.ts
import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../lib/prisma.service.js';
import { CreateFileDto } from './dto/create-file.dto.js';

@Injectable()
export class FileService {
  private uploadPath = path.join(process.cwd(), 'uploads');

  constructor(private prismaService:PrismaService) {
    // create uploads folder if it does not exist
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  uploadFile(file: Express.Multer.File, createFileDto:CreateFileDto) {
    if (!file) throw new BadRequestException('File is required');

    const projectFolder = path.join(this.uploadPath, String(createFileDto.projectId));

    // create project-specific folder
    if (!fs.existsSync(projectFolder)) {
      fs.mkdirSync(projectFolder);
    }

    const filePath = path.join(projectFolder, file.originalname);

    // Save file locally
    fs.writeFileSync(filePath, file.buffer);
    return this.prismaService.file.create({
      data:{
        "filename":file.originalname,
        "url":filePath,
        "userId":createFileDto.userId,
        "projectId":createFileDto.projectId
     }

    });

    
  }
}
