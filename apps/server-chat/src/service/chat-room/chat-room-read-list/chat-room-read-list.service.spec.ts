import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomReadListService } from './chat-room-read-list.service';

describe('ChatRoomReadListService', () => {
  let service: ChatRoomReadListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomReadListService],
    }).compile();

    service = module.get<ChatRoomReadListService>(ChatRoomReadListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
