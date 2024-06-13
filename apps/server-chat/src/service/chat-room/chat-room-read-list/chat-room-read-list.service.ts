import { Injectable, Logger } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { ChatRoomEntity } from '../../../domain/chat-room/chat-room.entity';
import {
  ChatRoomReadListServiceController,
  ReadListChatRoomRequest,
  ReadListChatRoomResponse,
} from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-read-list.service';
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatRoomReadListService
  implements ChatRoomReadListServiceController
{
  logger = new Logger(ChatRoomReadListService.name);

  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,
  ) {}

  async readListChatRoom(
    request: ReadListChatRoomRequest,
  ): Promise<ReadListChatRoomResponse> {
    this.logger.log({ request });

    const queryBuilder = this.chatRoomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.createdBy', 'createdBy')
      .leftJoinAndSelect('room.createdBy', 'updatedBy')
      .leftJoinAndSelect('room.createdBy', 'deletedBy');

    if (
      request?.participant?.createdDateTimeFrom &&
      request?.participant?.createdDateTimeTo
    ) {
      this.logger.debug({ participant: request.participant });
      queryBuilder
        .leftJoin('room.participants', 'participant')
        .andWhere(
          'participant.createdDateTime BETWEEN :createdDateTimeFrom AND :createdDateTimeTo',
          {
            createdDateTimeFrom: request.participant.createdDateTimeFrom,
            createdDateTimeTo: request.participant.createdDateTimeTo,
          },
        )
        .orderBy('COUNT(participant.id)', 'DESC') // createdDateTime 기준으로 count 후 내림차순 정렬
        .addSelect('COUNT(participant.id)', 'latestParticipatedCount') // createdDateTime 기준으로 count된 수를 추가 컬럼으로 가져옴
        .groupBy('room.id'); // Room ID 기준으로 그룹화
    }

    if (
      request?.room?.createdDateTimeFrom &&
      request?.room?.createdDateTimeTo
    ) {
      queryBuilder.andWhere(
        'room.createDateTime BeTWEEN :createdDateTimeFrom AND :createdDateTimeTo',
        {
          createdDateTimeFrom: request.room.createdDateTimeFrom,
          createdDateTimeTo: request.room.createdDateTimeTo,
        },
      );
    }

    if (request?.room?.ids?.length > 0) {
      queryBuilder.andWhere('room.id IN(:roomIds)', {
        roomIds: request.room.ids,
      });
    }

    const [results, totalCount] = await queryBuilder.getManyAndCount();

    return {
      results,
    };
  }
}
