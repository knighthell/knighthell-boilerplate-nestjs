import { CreatePlaceResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from './place.dto';
import { Type } from 'class-transformer';
import { Place } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';

export class CreatePlaceResponseDto implements CreatePlaceResponse {
  @Type(() => PlaceDto)
  place: PlaceDto;
}
