import { Test, TestingModule } from '@nestjs/testing';
import { ServerAuthController } from './server-auth.controller';
import { ServerAuthService } from './server-auth.service';

describe('ServerAuthController', () => {
  let serverAuthController: ServerAuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerAuthController],
      providers: [ServerAuthService],
    }).compile();

    serverAuthController = app.get<ServerAuthController>(ServerAuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serverAuthController.getHello()).toBe('Hello World!');
    });
  });
});
