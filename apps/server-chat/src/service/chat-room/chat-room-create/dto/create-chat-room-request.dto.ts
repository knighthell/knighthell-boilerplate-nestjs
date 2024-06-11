import {
  CreateChatRoomRequest,
  CreateChatRoomRequest_ChatRoom,
} from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-create.service';
import { ChatRoomDto } from '../../../../domain/chat-room/chat-room.dto';
import { Type } from 'class-transformer';
import { PickType } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class CreateChatRoomRequestDto implements CreateChatRoomRequest {
  @Type(() => CreateChatRoomRequest_ChatRoomDto)
  @ValidateNested()
  room: CreateChatRoomRequest_ChatRoomDto;
}

export class CreateChatRoomRequest_ChatRoomDto
  extends PickType(ChatRoomDto, ['title'] as const)
  implements CreateChatRoomRequest_ChatRoom {}
