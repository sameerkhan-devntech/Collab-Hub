import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway.js';
import { ChatService } from './chat.service.js';
import { ChatController } from './chat.controller.js';
import { PrismaModule } from '../lib/prisma.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}), // uses global JWT config from auth module
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
  exports:[ChatService]
})
export class ChatModule {}
