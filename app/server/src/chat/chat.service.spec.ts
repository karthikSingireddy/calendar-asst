import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils';
import { MessageModelDefinition } from '../schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModelDefinition } from '../schemas/chat.schema';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UserDocument } from '../schemas/user.schema';

describe('ChatService', () => {
  let service: ChatService;
  let userService: UsersService;
  let user: UserDocument;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([ChatModelDefinition, MessageModelDefinition]),
        UsersModule
      ],
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
    userService = module.get<UsersService>(UsersService);

    user = await userService.createUser({
      firstName: 'milo',
      lastName: 'singireddy',
      password: 'abcdef',
      email: 'test@gmail.com'
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should expect userService to be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should expect user to be defined', () => {
    expect(user).toBeDefined();
  });

  it('should create a chat', async () => {
    const chat = await service.createChat(user._id.toString());
    expect(chat).toBeDefined();

    expect(chat.description).toBe('');
    expect(chat.messages).toHaveLength(0);

    expect(chat.createdBy).toBeDefined();
    expect(chat.createdBy._id).toStrictEqual(user._id);
  });

  it('should get chats by user id', async () => {
    const chats = await service.getChatsByUserId(user._id.toString());
    expect(chats).toHaveLength(1);
    expect(chats[0].createdBy._id).toStrictEqual(user._id);
  });

  afterAll(() => {
    closeInMongodConnection();
  });
});
