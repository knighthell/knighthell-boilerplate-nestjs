import { Test, TestingModule } from '@nestjs/testing';
import { PlaceGrpcController } from './place-grpc.controller';

describe('PlaceGrpcController', () => {
  let controller: PlaceGrpcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceGrpcController],
    }).compile();

    controller = module.get<PlaceGrpcController>(PlaceGrpcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
