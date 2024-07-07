import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwTService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<string> {
    const user = await this.userModel.findOne({
      email: email
    }).exec();

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    } else if (pass !== user.password) {
      throw new UnauthorizedException('Password does not match');
    }

    const payload = { email: user.email, sub: user._id };
    return await this.jwTService.signAsync(payload);
  }
}
