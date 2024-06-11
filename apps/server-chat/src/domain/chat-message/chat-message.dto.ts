import {
  ChatMessage,
  ChatMessageType,
} from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-message';
import { ChatUser } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-user';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { ChatParticipantDto } from '../chat-participant/chat-participant.dto';
import { ChatMessageContentDto } from './chat-message-content.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class ChatMessageDto implements ChatMessage {
  @ApiProperty()
  id: string;

  @ApiResponseProperty()
  createdBy: ChatUser | undefined;
  @ApiResponseProperty()
  createdDateTimeUTC: Date | undefined;
  @ApiResponseProperty()
  updatedBy?: ChatUser | undefined;
  @ApiResponseProperty()
  updatedDateTimeUTC?: Date | undefined;
  @ApiResponseProperty()
  deletedBy?: ChatUser | undefined;
  @ApiResponseProperty()
  deletedDateTimeUTC?: Date | undefined;

  @ApiProperty()
  @ApiResponseProperty()
  @Type(() => ChatParticipantDto)
  @ValidateNested()
  participant: ChatParticipantDto | undefined;

  @ApiProperty()
  @ApiResponseProperty()
  type: ChatMessageType;

  @ApiProperty()
  @Type(() => ChatMessageContentDto)
  @ValidateNested()
  content: ChatMessageContentDto | undefined;
}
