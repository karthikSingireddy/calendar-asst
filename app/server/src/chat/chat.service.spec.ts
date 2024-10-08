import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils';
import { MessageDocument, MessageModelDefinition } from '../schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatDocument, ChatModelDefinition } from '../schemas/chat.schema';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UserDocument } from '../schemas/user.schema';

describe('ChatService', () => {
  let service: ChatService;
  let userService: UsersService;
  let user: UserDocument;
  let chat: ChatDocument;
  let msg: MessageDocument;

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
    chat = await service.createChat(user._id.toString());
    expect(chat).toBeDefined();

    expect(chat.description).toBe('');

    expect(chat.createdBy).toBeDefined();
    expect(chat.createdBy._id).toStrictEqual(user._id);
  });

  it('should get chats by user id', async () => {
    const chats = await service.getChatsByUserId(user._id.toString());
    expect(chats).toHaveLength(1);
    expect(chats[0].createdBy._id).toStrictEqual(user._id);
  });

  it('should create a lot of chats', () => {
    const promises = [];
    for (let i = 0; i < 100; i++) {
      promises.push(service.createChat(user._id.toString()));
    }
    return Promise.all(promises);
  });

  it('should get all chats by user id', async () => {
    const chats = await service.getChatsByUserId(user._id.toString());
    expect(chats).toHaveLength(101);
    chats.map(chat=> chat.createdBy._id).forEach(id => expect(id).toStrictEqual(user._id));
  });

  it('should create a new message', async () => {
    msg = await service.createMessage(chat._id.toString(), 'hello', true);

    expect(msg).toBeDefined();
    expect(msg.content).toBe('hello');
    expect(msg.fromUser).toBe(true);
    expect(msg.chat._id).toStrictEqual(chat._id);
  });

  afterAll(() => {
    closeInMongodConnection();
  });
});
