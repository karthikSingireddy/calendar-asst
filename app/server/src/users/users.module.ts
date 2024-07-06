import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModelDefinition, UserSchema } from '../schemas/user.schema';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([UserModelDefinition])
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
