import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomCreateService } from './chat-room-create.service';

describe('ChatRoomCreateService', () => {
  let service: ChatRoomCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomCreateService],
    }).compile();

    service = module.get<ChatRoomCreateService>(ChatRoomCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
