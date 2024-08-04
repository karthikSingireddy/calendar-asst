import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Message {
  @Prop()
  content: string;

  @Prop()
  fromUser: boolean;
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.loadClass(Message);

export const MessageModelDefinition = {
  name: Message.name,
  schema: MessageSchema
};
