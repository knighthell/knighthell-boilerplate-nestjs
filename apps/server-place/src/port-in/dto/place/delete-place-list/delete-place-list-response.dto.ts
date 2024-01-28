import { PlaceDto } from '../place.dto';
import { DeletePlaceListResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { ApiResponseProperty } from '@nestjs/swagger';

export class DeletePlaceListResponseDto implements DeletePlaceListResponse {
  @ApiResponseProperty({ type: Array<PlaceDto> })
  results: PlaceDto[];
}
