import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '@calendar-asst/types';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}


  @Get()
  test() {
    return this.userService.findAll();
  }

  @Post('/signup')
  signUp(@Body() userDto: CreateUserDTO) {
    try {
      this.userService.createUser(userDto);
    } catch (e) {
      if (!(e instanceof HttpException)) {
        e = new HttpException('Server error', 500);
      }
      throw e;
    }
  }
}
