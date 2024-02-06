import { PlaceDto } from '../place.dto';
import { ApiResponseProperty } from '@nestjs/swagger';
import { DeletePlaceListResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-delete.service';

export class DeletePlaceListResponseDto implements DeletePlaceListResponse {
  @ApiResponseProperty({ type: Array<PlaceDto> })
  results: PlaceDto[];
}
