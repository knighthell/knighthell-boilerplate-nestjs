import { ChatUser } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-user';
import { IsEmail, IsString, IsUrl, IsUUID, Length } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class ChatUserDto implements ChatUser {
  @ApiProperty()
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @ApiResponseProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @ApiResponseProperty()
  @IsString()
  @Length(2, 50)
  displayName: string;

  @ApiProperty()
  @ApiResponseProperty()
  createdDateTimeUTC: Date | undefined;

  @ApiProperty()
  @ApiResponseProperty()
  @IsUrl()
  photoUrl?: string | undefined;
}
