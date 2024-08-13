import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleOAuthService } from './googleOAuth.service';

@Module({
  imports: [
    MongooseModule.forFeature([UserModelDefinition]),
    JwtModule.register({
      global: true,
      secret: 'test secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, GoogleOAuthService],
  exports: [UsersService]
})
export class UsersModule {}
