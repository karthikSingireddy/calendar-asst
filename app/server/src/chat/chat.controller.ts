import { Controller, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGaurd } from '../users/auth.gaurd';
import { ChatDocument } from '../schemas/chat.schema';
import { ChatDAO } from '@calendar-asst/types';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService
  ) {}

  @UseGuards(AuthGaurd)
  @Post()
  async createNewChat(@Req() req: Request): Promise<ChatDAO> {
    const userId: string = req['user'].sub;
    const chat: ChatDocument = await this.chatService.createChat(userId);
    return chat.toDao();
  }
}
