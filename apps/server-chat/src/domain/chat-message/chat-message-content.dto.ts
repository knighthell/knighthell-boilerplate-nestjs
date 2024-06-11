import { ChatMessageContent } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-message';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ChatMessageContentDto implements ChatMessageContent {
  @ApiProperty()
  @ApiResponseProperty()
  @IsString()
  @Length(1, 500)
  text: string;
}
