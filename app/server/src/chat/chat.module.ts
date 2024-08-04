import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModelDefinition } from '../schemas/chat.schema';
import { MessageModelDefinition } from '../schemas/message.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([ChatModelDefinition, MessageModelDefinition]),
    UsersModule
  ],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
