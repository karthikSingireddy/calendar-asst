import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Message } from '../schemas/message.schema';

@Injectable()
export class OpenAIService {
  private client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
  });

  async getResponse(messages: Message[]) {
    const completion = await this.client.chat.completions.create({
      messages: messages.map(msg => ({
        role: msg.fromUser ? 'user' : 'system',
        content: msg.content
      })),
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content;
  }
}
