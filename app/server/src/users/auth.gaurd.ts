import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['access_token'];

    if (!token) {
      throw new UnauthorizedException('No access token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: 'test secret'
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
