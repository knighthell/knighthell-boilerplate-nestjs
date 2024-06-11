import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { ChatParticipant } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-participant';
import { ChatRoomDto } from '../chat-room/chat-room.dto';
import { ChatUserDto } from '../chat-user/chat-user.dto';

export class ChatParticipantDto implements ChatParticipant {
  @ApiProperty()
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  createdBy: ChatUserDto | undefined;
  @ApiResponseProperty()
  createdDateTimeUTC: Date | undefined;
  @ApiResponseProperty()
  updatedBy?: ChatUserDto | undefined;
  @ApiResponseProperty()
  updatedDateTimeUTC?: Date | undefined;
  @ApiResponseProperty()
  deletedBy?: ChatUserDto | undefined;
  @ApiResponseProperty()
  deletedDateTimeUTC?: Date | undefined;

  @ApiProperty()
  @ApiResponseProperty()
  room: ChatRoomDto | undefined;

  @ApiProperty()
  @ApiResponseProperty()
  user: ChatUserDto | undefined;

  @ApiPropertyOptional()
  @ApiResponseProperty()
  participantName?: string | undefined;

  @ApiPropertyOptional()
  @ApiResponseProperty()
  participantPhotoUrl?: string | undefined;
}
