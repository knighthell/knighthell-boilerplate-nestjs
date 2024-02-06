import { PlaceDto } from '../place.dto';
import { ApiResponseProperty } from '@nestjs/swagger';
import { UpdatePlaceListResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-update.service';

export class UpdatePlaceListResponseDto implements UpdatePlaceListResponse {
  @ApiResponseProperty({ type: Array<PlaceDto> })
  results: PlaceDto[];
}
