import { ChatRoomStatistics } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-statistics';
import { IsNumber } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ChatRoomStatisticsDto implements ChatRoomStatistics {
  @ApiResponseProperty()
  @IsNumber()
  participantCount: number;
}
