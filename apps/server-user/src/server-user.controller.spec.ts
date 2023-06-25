import { Test, TestingModule } from '@nestjs/testing';
import { ServerUserController } from './server-user.controller';
import { ServerUserService } from './server-user.service';

describe('ServerUserController', () => {
  let serverUserController: ServerUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerUserController],
      providers: [ServerUserService],
    }).compile();

    serverUserController = app.get<ServerUserController>(ServerUserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serverUserController.getHello()).toBe('Hello World!');
    });
  });
});
