import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserDTO } from '@calendar-asst/types';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([UserModelDefinition])
      ],
      controllers: [UsersController],
      providers: [UsersService, AuthService,JwtService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const dto: CreateUserDTO = {
    firstName: 'Milo',
    lastName: 'Singireddy',
    email: 'milo@singireddy.com',
    password: 'abcdef'
  };

  it('should create a new user', async () => {
    expect(await controller.signUp(dto)).toBeDefined();
  });

  it('should fail when creating a new user with same email', async () => {
    await expect(() => controller.signUp(dto))
      .rejects
      .toThrowError(`User with email: ${dto.email} already exists`);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  })
});
