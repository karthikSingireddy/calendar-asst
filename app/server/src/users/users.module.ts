import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModelDefinition, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([UserModelDefinition])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
