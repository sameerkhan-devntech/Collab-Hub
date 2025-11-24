import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma.service.js';
import { CreateNotificationDto } from './dto/create-notification.dto.js';
import { NotificationGateway } from './notification.gateway.js';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private gateway: NotificationGateway,
  ) {}

  async create(dto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: dto,
    });

    // Emit notification
    this.gateway.sendToUser(dto.userId, notification);

    return notification;
  }

  async getUserNotifications(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: number) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
