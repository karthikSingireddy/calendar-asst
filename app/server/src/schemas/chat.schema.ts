import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ChatDAO } from '@calendar-asst/types';
import { User } from './user.schema';
import { AbstractSchema } from './abstractSchema';

@Schema()
export class Chat extends AbstractSchema {
  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
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
