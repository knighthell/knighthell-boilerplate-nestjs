import { CreatePlaceResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from './place.dto';

export class CreatePlaceResponseDto implements CreatePlaceResponse {
  place: PlaceDto;
}
