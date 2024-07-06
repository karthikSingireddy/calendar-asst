import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModelDefinition, UserSchema } from '../schemas/user.schema';
import { CreateUserDTO } from '@calendar-asst/types';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([UserModelDefinition])
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should assert findAll is array', async () => {
    expect(Array.isArray(await service.findAll())).toBe(true);
  });

  describe('create user and ensure database has it', () => {
    it('should validate findAll returns 0 users', async () => {
      expect(await service.findAll()).toHaveLength(0);
    });

    const firstName = 'Milo';
    const lastName = 'Singireddy';
    const email = 'milo@singireddy.com';
    const password = 'abcdef';

    const dto: CreateUserDTO = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    it('should create user in db', async () => {
      const user = await service.createUser({
        firstName,
        lastName,
        email,
        password
      });

      expect(user.firstName).toEqual(firstName);
      expect(user.lastName).toEqual(lastName);
      expect(user.email).toEqual(email);
      expect(user.password).toEqual(password);
    });

    it('should validate findAll returns the new user', async () => {
      expect(await service.findAll()).toHaveLength(1);
    });

    it('should validate userExists', async () => {
      expect(await service.userExists(dto.email)).toBe(true);
    });
  })

  afterAll(async () => {
    await closeInMongodConnection();
  })
});
