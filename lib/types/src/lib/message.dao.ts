import { IsBoolean, IsNotEmpty } from 'class-validator';

export class MessageDAO {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  content: string;

  @IsBoolean()
  fromUser: boolean;
}
