import { ChatRoom } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room';
import { IsString, IsUUID, Length, ValidateNested } from 'class-validator';
import { ChatRoomStatisticsDto } from '../chat-room-statistics/chat-room-statistics.dto';
import { Transform, Type } from 'class-transformer';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { ChatUserDto } from '../chat-user/chat-user.dto';

export class ChatRoomDto implements ChatRoom {
  @ApiProperty()
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional()
  @ApiResponseProperty()
  @IsString()
  @Length(2, 50)
  title: string;

  @ApiResponseProperty({ type: ChatRoomStatisticsDto })
  @Type(() => ChatRoomStatisticsDto)
  @ValidateNested()
  statistics: ChatRoomStatisticsDto | undefined;

  @ApiResponseProperty()
  createdBy: ChatUserDto | undefined;
  @ApiResponseProperty()
  @Transform(({}) => {})
  createdDateTimeUTC: Date | undefined;

  @ApiResponseProperty()
  updatedBy?: ChatUserDto | undefined;
  @ApiResponseProperty()
  updatedDateTimeUTC?: Date | undefined;

  @ApiResponseProperty()
  deletedBy?: ChatUserDto | undefined;
  @ApiResponseProperty()
  deletedDateTimeUTC?: Date | undefined;
}
