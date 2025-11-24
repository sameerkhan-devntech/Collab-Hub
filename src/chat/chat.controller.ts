import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service.js';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
 //To get room messages through http request for data fetching
  @Get('messages')
  async getMessages(
    @Query('roomId') roomId: string,
  ) {
    if (roomId) return this.chatService.getRoomMessages(Number(roomId));  
  }
}
