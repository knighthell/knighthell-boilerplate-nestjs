import { Test, TestingModule } from '@nestjs/testing';
import { PlaceDeleteService } from './place-delete.service';

describe('PlaceDeleteService', () => {
  let service: PlaceDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceDeleteService],
    }).compile();

    service = module.get<PlaceDeleteService>(PlaceDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
