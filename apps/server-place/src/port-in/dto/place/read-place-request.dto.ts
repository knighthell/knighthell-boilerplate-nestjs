import { ReadPlaceRequest } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReadPlaceRequestDto implements ReadPlaceRequest {
  @ApiProperty({
    description: '장소(Place) 고유 Id',
  })
  @IsString()
  @IsUUID()
  placeId: string;
}
