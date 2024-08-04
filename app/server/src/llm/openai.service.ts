import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
  });

  async getResponse() {
    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content;
  }
}
