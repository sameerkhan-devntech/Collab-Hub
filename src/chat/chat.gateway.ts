import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service.js';
import { CreateChatMessageDto } from './dto/create-chat.dto.js';
import { ValidationPipe, UsePipes, UnauthorizedException } from '@nestjs/common';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/',
})
export class ChatGateway implements  OnGatewayInit,OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(
    private chatService: ChatService,
    private jwtService: JwtService,
  ) {}

  afterInit() {
    console.log('Chat Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log("client connected")
//     // try {
//     //   const token =
//     //     client.handshake.auth?.token ||
//     //     client.handshake.query?.token||
//     //     client.handshake.headers.authorization?.replace('Bearer ', '');

//     //   if (!token) throw new UnauthorizedException();

//     //   const payload = this.jwtService.verify(token);
//     //   (client as any).user = payload; // attach user to socket

//     //   console.log(`Client connected: ${client.id} user: ${payload.sub}`);
//     // } catch (e) {
//     //   console.log('Unauthorized socket connection');
//     //   client.disconnect();
//     // }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // when user added to room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { roomId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `room_${data.roomId}`;
    client.join(room);
    client.emit('joinedRoom', { roomId: data.roomId });
  }

  // when user leaves room
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { roomId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `room_${data.roomId}`;
    client.leave(room);
    client.emit('leftRoom', { roomId: data.roomId });
  }

  // Send Message
  @SubscribeMessage('sendMessage')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleMessage(
    @MessageBody() dto: CreateChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const created = await this.chatService.create(dto);

    if (dto.roomId) {
      this.server.to(`room_${dto.roomId}`).emit('Message', created);    //send msg in room
      return { status: 'ok' }; 
    } 
  
    else {
      return {status:'room Id not provided'};
    }
  }

}


