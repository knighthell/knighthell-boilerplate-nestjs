import { PlaceDto } from '../place.dto';
import { ApiResponseProperty } from '@nestjs/swagger';
import { CreatePlaceListResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-create.service';

export class CreatePlaceListResponseDto implements CreatePlaceListResponse {
  @ApiResponseProperty({ type: Array<PlaceDto> })
  results: PlaceDto[];
}
