import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Message, MessageSchema } from './message.schema';
import { ChatDAO } from '../../../../lib/types/src/lib/chat.dao';
import { User, UserSchema } from './user.schema';
import { randomUUID } from 'crypto';

@Schema()
export class Chat {
  @Prop({ default: randomUUID() })
  _id: MongooseSchema.Types.ObjectId

  @Prop()
  description: string;

  @Prop({ type: [MessageSchema]})
  messages: Message[];

  @Prop({ type: UserSchema })
  createdBy: User;

  toDao(): ChatDAO {
    return new ChatDAO(
      this._id.toString(),
      this.description,
      this.createdBy.toUserDAO()
    );
  }
}

export type ChatDocument = HydratedDocument<Chat>;
export const ChatSchema = SchemaFactory.createForClass(Chat);
ChatSchema.loadClass(Chat);

export const ChatModelDefinition = {
  name: Chat.name,
  schema: ChatSchema
};
