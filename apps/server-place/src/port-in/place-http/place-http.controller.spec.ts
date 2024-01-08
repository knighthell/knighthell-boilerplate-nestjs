import { Test, TestingModule } from '@nestjs/testing';
import { PlaceHttpController } from './place-http.controller';

describe('PlaceHttpController', () => {
  let controller: PlaceHttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceHttpController],
    }).compile();

    controller = module.get<PlaceHttpController>(PlaceHttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
