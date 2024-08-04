import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { UserDAO } from '@calendar-asst/types';
import { randomUUID } from 'crypto';
import { ObjectId } from 'mongodb'

@Schema()
export class User {
  @Prop({ default: () => new ObjectId() })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  toUserDAO(): UserDAO {
    return new UserDAO(
      this.firstName,
      this.lastName,
      this.email,
    );
  }
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);
export const UserModelDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema
};
