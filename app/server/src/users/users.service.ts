import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from '@calendar-asst/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async createUser(userDto: CreateUserDTO): Promise<UserDocument> {
    if ((await this.userExistsByEmail(userDto.email))) {
      throw new BadRequestException(`User with email: ${userDto.email} already exists`);
    }

    const user = new this.userModel({
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      password: userDto.password
    });

    await user.save();
    return user;
  }

  async userExistsByEmail(email: string): Promise<boolean> {
    const userInDb = await this.userModel.findOne({ email: email }).exec();
    return !!userInDb;
  }

  public findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id });
  }
}
