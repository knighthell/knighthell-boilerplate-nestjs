import { CreateChatRoomResponse } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-create.service';
import { ChatRoomDto } from '../../../../domain/chat-room/chat-room.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class CreateChatRoomResponseDto implements CreateChatRoomResponse {
  @ApiResponseProperty({ type: ChatRoomDto })
  room: ChatRoomDto | undefined;
}
