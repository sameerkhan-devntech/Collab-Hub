
// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     ParseIntPipe,
//     Post,
//     Put,
//     HttpCode,
//     HttpStatus,
//   } from '@nestjs/common';
// import { MessagesService } from './messages.service.js';
// import { CreateMessageDto } from './dto/create-message.dto.js';
// import { UpdateMessageDto } from './dto/update-message.dto.js';
// @Controller('messages')
// export class MessagesController{
//     constructor (private readonly messagesService:MessagesService) {}

//     @Post()
//     async create (@Body() createMessageDto : CreateMessageDto){
//         const message = await this.messagesService.create(createMessageDto);
//         return message;

//     }

//     @Get()
//     async findAll(){
//         return this.messagesService.findAll();
//     }

//     @Get(':id')
//     async findOne(@Param('id' ,ParseIntPipe) id:number ){
//         return this.messagesService.findOne(id);

//     }

//     @Put(':id')
//     async update(@Param('id', ParseIntPipe) id:number ,@Body() updateMessageDto : UpdateMessageDto,){
//         return this.messagesService.update(id,updateMessageDto)

                
//     }

//     @Delete(':id')
//     @HttpCode(HttpStatus.NO_CONTENT)
//     async remove(@Param('id' ,ParseIntPipe) id:number){
//         await this.messagesService.remove(id)
//     }
// }