import { ReadPlaceResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from './place.dto';

export class ReadPlaceResponseDto implements ReadPlaceResponse {
  place: PlaceDto;
}
