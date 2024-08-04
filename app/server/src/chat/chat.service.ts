import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { Model } from 'mongoose';
import { Message } from '../schemas/message.schema';
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

  async getChatsByUserId(userId: string): Promise<ChatDocument[]> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const chats: ChatDocument[] = await this.chatModel.find({ createdBy: user });
    return chats;
  }
}
