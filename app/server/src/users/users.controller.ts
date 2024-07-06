import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UserDAO } from '@calendar-asst/types';
import { AuthService } from './auth.service';
import { LoginDTO } from '../../../../lib/types/src/lib/login.dto';
import { UserDocument } from '../schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}


  @Get()
  test() {
    return this.userService.findAll();
  }

  @Post('/signup')
  async signUp(@Body() userDto: CreateUserDTO): Promise<UserDAO> {
    try {
       const user = await this.userService.createUser(userDto);
       return user.toUserDAO();
    } catch (e) {
      if (!(e instanceof HttpException)) {
        e = new HttpException('Server error', 500);
      }
      throw e;
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDTO): Promise<UserDAO> {
    const result: UserDocument = await this.authService.signIn(loginDto.email, loginDto.password);

    return result.toUserDAO();
  }
}
