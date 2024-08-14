import { Body, Controller, Get, HttpException, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenDAO, CreateUserDTO, GapiCodeDTO, LoginDTO, UserDAO } from '@calendar-asst/types';
import { AuthService } from './auth.service';
import { AuthGaurd } from './auth.gaurd';
import { GoogleOAuthService } from './googleOAuth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly googleOAuthService: GoogleOAuthService
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
        throw new HttpException('Server error', 500);
      }
      throw e;
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDTO): Promise<AccessTokenDAO> {
    const token = await this.authService.signIn(loginDto.email, loginDto.password);
    return new AccessTokenDAO(token);
  }

  @UseGuards(AuthGaurd)
  @Get('/profile')
  profile(@Req() req) {
    return req.user;
  }

  @Get('/gapi')
  googleOAuth() {
    return { msg: this.googleOAuthService.generateAuthUrl() };
  }

  @UseGuards(AuthGaurd)
  @Post('/gapi-token')
  async setGoogleAuthToke(@Req() req: Request, @Body() gapiCodeDto: GapiCodeDTO) {
    const userId = req['user'].sub;
    const user = await this.userService.setGoogleAuthCode(userId, gapiCodeDto.code);
    return user.toUserDAO();
  }
}


