import { PlaceUser } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-user';
import { IsEmail, IsString, IsUrl, IsUUID, Length } from 'class-validator';

export class PlaceUserDto implements PlaceUser {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsUrl()
  photoURL: string;

  @IsString()
  @Length(2, 255)
  displayName: string;
}
