import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGaurd } from '../users/auth.gaurd';
import { ChatDocument } from '../schemas/chat.schema';
import { ChatDAO, MessageDAO, MessageDTO } from '@calendar-asst/types';
import { MessageDocument } from '../schemas/message.schema';
import { OpenAIService } from '../llm/openai.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly openAIService: OpenAIService
  ) {}

  @Get()
  @UseGuards(AuthGaurd)
  async getChats(@Req() req: Request): Promise<ChatDAO[]> {
    const userId: string = req['user'].sub;
    const chats: ChatDocument[] = await this.chatService.getChatsByUserId(userId);
    return chats.map(chat => chat.toDao());
  }

  @Get('/messages/:chatId')
  @UseGuards(AuthGaurd)
  async getMessagesInChat(@Param('chatId') chatId: string): Promise<MessageDAO[]> {
    const chat = await this.chatService.getChatById(chatId);
    if (!chat) {
      throw new BadRequestException('Chat does not exist');
    }

    const messages = await this.chatService.getMessagesInChat(chatId);
    return messages.map(msg => msg.toDao());
  }

  @Post()
  @UseGuards(AuthGaurd)
  async createNewChat(@Req() req: Request): Promise<ChatDAO> {
    const userId: string = req['user'].sub;
    const chat: ChatDocument = await this.chatService.createChat(userId);
    return chat.toDao();
  }

  @Post('/message')
  @UseGuards(AuthGaurd)
  async newMessage(@Body() messageDto: MessageDTO): Promise<MessageDAO> {
    const message: MessageDocument = await this.chatService.createMessage(messageDto.chatId, messageDto.content, true);
    const llmResponse = await this.openAIService.getResponse();
    if (message) {
      return {
        chatId: messageDto.chatId,
        content: llmResponse,
        fromUser: false
      };
    } else {
      throw new HttpException('Failed to create message', 500);
    }
  }
}
