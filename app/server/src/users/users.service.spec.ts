import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../schemas/user.schema';
import { CreateUserDTO } from '@calendar-asst/types';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([UserModelDefinition])
      ],
      providers: [UsersService, AuthService, JwtService],
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

    it('should validate userExistsByEmail', async () => {
      expect(await service.userExistsByEmail(dto.email)).toBe(true);
    });

    it('should validate userExistsByEmail is false when it does not exist', async () => {
      expect(await service.userExistsByEmail('dummyEmail@gmail.com')).toBe(false);
    });
  })

  afterAll(async () => {
    await closeInMongodConnection();
  })
});
