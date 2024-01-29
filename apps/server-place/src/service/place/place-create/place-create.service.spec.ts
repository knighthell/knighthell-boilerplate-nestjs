import { Test, TestingModule } from '@nestjs/testing';
import { PlaceCreateService } from './place-create.service';

describe('PlaceCreateService', () => {
  let service: PlaceCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceCreateService],
    }).compile();

    service = module.get<PlaceCreateService>(PlaceCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
