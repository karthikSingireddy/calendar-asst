import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Chat } from './chat.schema';

@Schema()
export class Message {
  @Prop()
  content: string;

  @Prop()
  fromUser: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Chat.name })
  chat: Chat;
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.loadClass(Message);

export const MessageModelDefinition = {
  name: Message.name,
  schema: MessageSchema
};
