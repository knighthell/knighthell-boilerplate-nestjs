import { Test, TestingModule } from '@nestjs/testing';
import { PlaceUpdateService } from './place-update.service';

describe('PlaceUpdateService', () => {
  let service: PlaceUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceUpdateService],
    }).compile();

    service = module.get<PlaceUpdateService>(PlaceUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
