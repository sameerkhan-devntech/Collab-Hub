import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma.service.js';
import { CreateChatMessageDto } from './dto/create-chat.dto.js';
import { Message } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateChatMessageDto):Promise<Message> {
    return this.prisma.message.create({
      data: {
        content: dto.content,
        userId: dto.userId,
        roomId: dto.roomId,
        ProjectId:dto.projectId
      },
      include: {
        user: true,
      },
    });
  }

  async getRoomMessages(roomId: number, limit = 50) {
    return this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
      take: limit,
      include: {
        user: true,
      },
    });
  }

  async getAllMessages(limit = 50) {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
      take: limit,
      include: {
        user: true,
      },
    });
  }
}
