// // import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
// // import { PrismaService } from '../lib/prisma.service.js';

// // import {Message}  from '@prisma/client';
// // import { CreateMessageDto } from './dto/create-message.dto.js';
// // @Injectable()
// // export class MessagesService{

// //     constructor (private readonly prisma:PrismaService){}
// //     async create(createMessageDto:CreateMessageDto): Promise<Message>{

// //         const message = await this.prisma.message.create({
// //             data:{
// //                 content:createMessageDto.content,
// //                 userId:createMessageDto.userId

// //             }
// //         });
// //         return message;
// //     }


// // }

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../lib/prisma.service.js';
// import { CreateMessageDto } from './dto/create-message.dto.js';
// import { UpdateMessageDto } from './dto/update-message.dto.js';
// import { Message } from '@prisma/client';

// @Injectable()
// export class MessagesService {
//   constructor(private readonly prisma: PrismaService) {}

//   // CREATE -------------------------------------------------------
//   async create(createMessageDto: CreateMessageDto):Promise<Message> {
//     const { content, userId } = createMessageDto;

//     return this.prisma.message.create({
//       data: {
//         content,
//         userId,
//       },
//     });
//   }

//   // GET ALL -----------------------------------------------------
//   async findAll() {
//     return this.prisma.message.findMany({
//       orderBy: { createdAt: 'desc' },
//       include: {
//         user: true, // optional, remove if not needed
//       },
//     });
//   }

//   // GET ONE -----------------------------------------------------
//   async findOne(id: number) {
//     const message = await this.prisma.message.findUnique({
//       where: { id },
//       include: { user: true },
//     });

//     if (!message) {
//       throw new NotFoundException(`Message with ID ${id} not found`);
//     }

//     return message;
//   }

//   // UPDATE ------------------------------------------------------
//   async update(id: number, updateMessageDto: UpdateMessageDto) {
//     // ensure message exists
//     await this.ensureExists(id);

//     return this.prisma.message.update({
//       where: { id },
//       data: updateMessageDto,
//     });
//   }

//   // DELETE ------------------------------------------------------
//   async remove(id: number) {
//     await this.ensureExists(id);

//     await this.prisma.message.delete({
//       where: { id },
//     });

//     return;
//   }

//   // HELPER: Check if message exists ----------------------------
//   private async ensureExists(id: number) {
//     const exists = await this.prisma.message.findUnique({ where: { id } });

//     if (!exists) {
//       throw new NotFoundException(`Message with ID ${id} not found`);
//     }
//   }
// }
