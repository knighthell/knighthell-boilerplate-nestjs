import { Test, TestingModule } from '@nestjs/testing';
import { ServerEcommerceController } from './server-ecommerce.controller';
import { ServerEcommerceService } from './server-ecommerce.service';

describe('ServerEcommerceController', () => {
  let serverEcommerceController: ServerEcommerceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerEcommerceController],
      providers: [ServerEcommerceService],
    }).compile();

    serverEcommerceController = app.get<ServerEcommerceController>(ServerEcommerceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serverEcommerceController.getHello()).toBe('Hello World!');
    });
  });
});
