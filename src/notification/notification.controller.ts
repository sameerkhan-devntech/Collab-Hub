import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Body,
    Patch,
  } from '@nestjs/common';
  import { NotificationService } from './notification.service.js';
  import { CreateNotificationDto } from './dto/create-notification.dto.js';
  
  @Controller('notifications')
  export class NotificationController {
    constructor(private readonly service: NotificationService) {}
  
    @Post()
    create(@Body() dto: CreateNotificationDto) {
      return this.service.create(dto);
    }
  
    @Get('user/:userId')
    getUserNotifications(@Param('userId', ParseIntPipe) userId: number) {
      return this.service.getUserNotifications(userId);
    }
  
    @Patch(':id/read')
    markAsRead(@Param('id', ParseIntPipe) id: number) {
      return this.service.markAsRead(id);
    }
  }
  