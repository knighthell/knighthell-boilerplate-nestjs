import { UpdatePlaceListResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from '../place.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class UpdatePlaceListResponseDto implements UpdatePlaceListResponse {
  @ApiResponseProperty({ type: Array<PlaceDto> })
  results: PlaceDto[];
}
