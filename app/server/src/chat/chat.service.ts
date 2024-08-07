import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private userService: UsersService
  ) {}

  async createChat(userId: string): Promise<ChatDocument> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const chat = new this.chatModel({
      description: '',
      messages: [],
      createdBy: user
    });

    await chat.save();
    return chat;
  }

  async getChatById(chatId: string): Promise<ChatDocument> {
    return this.chatModel.findById(chatId);
  }

  async getChatsByUserId(userId: string): Promise<ChatDocument[]> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return this.chatModel.find({ createdBy: user });
  }

  async createMessage(chatId: string, content: string, fromUser: boolean): Promise<MessageDocument> {
    const chat: ChatDocument = await this.chatModel.findById(chatId);
    if (!chat) {
      throw new BadRequestException('Chat does not exist');
    }

    const message: MessageDocument = new this.messageModel({
      content: content,
      fromUser: fromUser,
      chat: chat
    });

    await message.save();
    return message;
  }

  getMessagesInChat(chatId: string): Promise<MessageDocument[]> {
    return this.messageModel.find({ chat: chatId });
  }
}
