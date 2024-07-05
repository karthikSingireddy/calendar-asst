import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

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
  signUp(@Body() body: { name: string }) {
    console.log(body);
    return { body };
  }
}
