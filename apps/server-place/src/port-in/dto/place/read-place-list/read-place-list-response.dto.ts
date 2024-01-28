import { ReadPlaceListResponse } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceDto } from '../place.dto';
import { ResponseInfoDto } from '../../common/response-info.dto';
import { Type } from 'class-transformer';

export class ReadPlaceListResponseDto implements ReadPlaceListResponse {
  @Type(() => ResponseInfoDto)
  responseInfo: ResponseInfoDto | undefined;

  @Type(() => Array<PlaceDto>)
  results: PlaceDto[];
}
