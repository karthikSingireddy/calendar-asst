import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModule = {}) => MongooseModule.forRootAsync({
  useFactory: async () => {
    mongod = await MongoMemoryServer.create();
    return {
      uri: mongod.getUri(),
      ...options
    }
  }
});

export const closeInMongodConnection = async () => {
  if (mongod) {
    await mongod.stop();
  }
}
