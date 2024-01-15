import { QueryPlaceListResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from './place.dto';
import { Type } from 'class-transformer';

export class QueryPlaceListResponseDto implements QueryPlaceListResponse {
  @Type(() => Array<PlaceDto>)
  results: PlaceDto[];
}
