import { Test, TestingModule } from '@nestjs/testing';
import { ServerChatController } from './server-chat.controller';
import { ServerChatService } from './server-chat.service';

describe('ServerChatController', () => {
  let serverChatController: ServerChatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerChatController],
      providers: [ServerChatService],
    }).compile();

    serverChatController = app.get<ServerChatController>(ServerChatController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serverChatController.getHello()).toBe('Hello World!');
    });
  });
});
