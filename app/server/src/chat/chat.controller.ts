import { Body, Controller, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGaurd } from '../users/auth.gaurd';
import { ChatDocument } from '../schemas/chat.schema';
import { ChatDAO } from '@calendar-asst/types';
import { MessageDTO } from '../../../../lib/types/src/lib/message.dto';
import { MessageDocument } from '../schemas/message.schema';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService
  ) {}

  @Post()
  @UseGuards(AuthGaurd)
  async createNewChat(@Req() req: Request): Promise<ChatDAO> {
    const userId: string = req['user'].sub;
    const chat: ChatDocument = await this.chatService.createChat(userId);
    return chat.toDao();
  }

  @Post('/message')
  @UseGuards(AuthGaurd)
  async newMessage(@Body() messageDto: MessageDTO) {
    const message: MessageDocument = await this.chatService.createMessage(messageDto.chatId, messageDto.content, true);
    if (message) {
      return {};
    } else {
      throw new HttpException('Failed to create message', 500);
    }
  }
}
