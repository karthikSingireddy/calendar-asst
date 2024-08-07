import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModelDefinition } from '../schemas/chat.schema';
import { MessageModelDefinition } from '../schemas/message.schema';
import { UsersModule } from '../users/users.module';
import { LLMModule } from '../llm/llm.module';

@Module({
  imports: [
    MongooseModule.forFeature([ChatModelDefinition, MessageModelDefinition]),
    UsersModule,
    LLMModule
  ],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
