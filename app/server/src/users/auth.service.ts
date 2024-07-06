import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async signIn(email: string, pass: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      email: 'milo@singireddy.com'
    }).exec();

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    } else if (pass !== user.password) {
      throw new UnauthorizedException('Password does not match');
    }

    delete user.password;

    return user;
  }
}
