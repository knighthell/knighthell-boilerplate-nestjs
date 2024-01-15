import { ReadPlaceResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from './place.dto';
import { Type } from 'class-transformer';

export class ReadPlaceResponseDto implements ReadPlaceResponse {
  @Type(() => PlaceDto)
  place: PlaceDto;
}
