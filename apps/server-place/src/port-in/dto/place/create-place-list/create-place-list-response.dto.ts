import { CreatePlaceListResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from '../place.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class CreatePlaceListResponseDto implements CreatePlaceListResponse {
  @ApiResponseProperty({ type: Array<PlaceDto> })
  results: PlaceDto[];
}
