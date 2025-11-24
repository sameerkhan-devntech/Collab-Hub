import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service.js';
import { NotificationController } from './notification.controller.js';
import { NotificationGateway } from './notification.gateway.js';

@Module({
  providers: [NotificationService,NotificationGateway],
  controllers: [NotificationController],
  exports:[NotificationService]
})
export class NotificationModule {}
