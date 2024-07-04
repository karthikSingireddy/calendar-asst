import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

let mongod: MongoMemoryServer;

const rootMongooseTestModule = (options: MongooseModule = {}) => MongooseModule.forRootAsync({
  useFactory: async () => {
    mongod = await MongoMemoryServer.create();
    return {
      uri: mongod.getUri(),
      ...options
    }
  }
});

const closeInMongodConnection = async () => {
  if (mongod) {
    await mongod.stop();
  }
}

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{
          name: User.name,
          schema: UserSchema
        }])
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

    it('should create new user', async () => {
      const user = await service.create('test@gmail.com', 'abcdef');
      expect(user).toBeDefined();
    });

    it('should validate findAll returns the new user', async () => {
      expect(await service.findAll()).toHaveLength(1);
    });
  })

  afterAll(async () => {
    await closeInMongodConnection();
  })
});
