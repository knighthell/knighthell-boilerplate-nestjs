import {
  DeletePlaceResponse,
  ReadPlaceResponse,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from './place.dto';

export class DeletePlaceResponseDto implements DeletePlaceResponse {
  place: PlaceDto;
}
