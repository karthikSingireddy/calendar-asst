import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { google } from 'googleapis';

const scopes = [
  'openid',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
]

@Injectable()
export class GoogleOAuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  public generateAuthUrl(): string {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:4200/gapi-token'
    );

    return client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }
}
