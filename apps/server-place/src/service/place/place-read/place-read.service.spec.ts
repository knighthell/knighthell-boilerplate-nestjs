import { Test, TestingModule } from '@nestjs/testing';
import { PlaceReadService } from './place-read.service';

describe('PlaceReadService', () => {
  let service: PlaceReadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceReadService],
    }).compile();

    service = module.get<PlaceReadService>(PlaceReadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
