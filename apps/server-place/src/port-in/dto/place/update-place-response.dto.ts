import { UpdatePlaceResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from './place.dto';
import { Type } from 'class-transformer';

export class UpdatePlaceResponseDto implements UpdatePlaceResponse {
  @Type(() => PlaceDto)
  place: PlaceDto;
}
