import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Schema as MongooseSchema } from 'mongoose';

export abstract class AbstractSchema {
  @Prop({ default: () => new ObjectId() })
  _id: MongooseSchema.Types.ObjectId;
}
