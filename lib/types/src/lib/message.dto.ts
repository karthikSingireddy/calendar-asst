import { IsNotEmpty } from 'class-validator';

export class MessageDTO {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  content: string;
}
