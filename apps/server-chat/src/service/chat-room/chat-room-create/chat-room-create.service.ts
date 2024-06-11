import { Injectable, Logger } from '@nestjs/common';
import {
  ChatRoomCreateServiceController,
  CreateChatRoomRequest,
  CreateChatRoomResponse,
} from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-create.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomEntity } from '../../../domain/chat-room/chat-room.entity';
import { Repository } from 'typeorm';
import { ChatRoomStatisticsEntity } from '../../../domain/chat-room-statistics/chat-room-statistics.entity';

@Injectable()
export class ChatRoomCreateService implements ChatRoomCreateServiceController {
  private readonly logger = new Logger(ChatRoomCreateService.name);

  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,
  ) {}

  async createChatRoom(
    request: CreateChatRoomRequest,
  ): Promise<CreateChatRoomResponse> {
    this.logger.log({ request });

    const creatableChatRoom = this.chatRoomRepository.create(request.room);
    creatableChatRoom.statistics = new ChatRoomStatisticsEntity();

    const createdChatRoom = await this.chatRoomRepository
      .save(creatableChatRoom)
      .then((createdChatRoom) =>
        this.chatRoomRepository.findOne({
          relations: {
            createdBy: true,
            updatedBy: true,
            deletedBy: true,
            statistics: true,
          },
          where: {
            id: createdChatRoom.id,
          },
        }),
      );

    return {
      room: createdChatRoom,
    };
  }
}
