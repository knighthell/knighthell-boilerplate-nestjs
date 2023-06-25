import { Test, TestingModule } from '@nestjs/testing';
import { ServerPlaceController } from './server-place.controller';
import { ServerPlaceService } from './server-place.service';

describe('ServerPlaceController', () => {
  let serverPlaceController: ServerPlaceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerPlaceController],
      providers: [ServerPlaceService],
    }).compile();

    serverPlaceController = app.get<ServerPlaceController>(ServerPlaceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serverPlaceController.getHello()).toBe('Hello World!');
    });
  });
});
