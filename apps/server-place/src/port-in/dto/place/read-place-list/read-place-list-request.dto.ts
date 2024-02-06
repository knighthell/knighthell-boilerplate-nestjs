import { Place } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PeriodDateTimeDto } from '../../common/period-datetime.dto';
import { BoundSquareDto } from './bound-square.dto';
import { BoundCircleDto } from './bound-circle.dto';
import { Wgs84CoordinatesDto } from '../wgs84-coordinates.dto';
import {
  Pagination,
  ReadPlaceListRequest,
  ReadPlaceListRequest_Place,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place-read.service';

export class ReadPlaceListRequestDto implements ReadPlaceListRequest {
  @ApiPropertyOptional({
    type: Array<ReadPlaceDto>,
    description: '장소 ID로 조회시 사용',
  })
  @ValidateNested()
  @Type(() => Array<ReadPlaceDto>)
  places: ReadPlaceDto[];

  @ApiPropertyOptional({
    type: String,
    example: 'minos coffee',
    description: '검색 키워드 조회',
  })
  keywords?: string | undefined;

  @ApiPropertyOptional({
    type: PeriodDateTimeDto,
    description: '생선된 날짜 기준으로 범위 조회',
  })
  @ValidateNested()
  @Type(() => PeriodDateTimeDto)
  createdAtPeriod?: PeriodDateTimeDto | undefined;

  @ApiPropertyOptional({
    type: PeriodDateTimeDto,
    description: '수정된 날짜 기준으로 범위 조회',
  })
  @ValidateNested()
  @Type(() => PeriodDateTimeDto)
  updatedAtPeriod?: PeriodDateTimeDto | undefined;

  @ApiPropertyOptional({
    type: PeriodDateTimeDto,
    description: '삭제된 날짜 기준으로 범위 조회',
  })
  @ValidateNested()
  @Type(() => PeriodDateTimeDto)
  deletedAtPeriod?: PeriodDateTimeDto | undefined;

  @ApiPropertyOptional({
    type: Boolean,
    example: true,
    default: false,
    description: '삭제된 장소 포함 조회 여부',
  })
  isIncludeDeletedPlace?: boolean | undefined;

  @ApiPropertyOptional({
    type: BoundSquareDto,
    description: '사각형 범위(좌상, 우하 좌표 기준)에 포함되는 장소 조회',
  })
  @ValidateNested()
  @Type(() => BoundSquareDto)
  boundSquare?: BoundSquareDto | undefined;

  @ApiPropertyOptional({
    type: BoundCircleDto,
    description:
      '원형 범위(중앙 좌표 및 반지름(미터) 기준)에 포함되는 장소 조회',
  })
  @ValidateNested()
  @Type(() => BoundCircleDto)
  boundCircle?: BoundCircleDto | undefined;

  @ApiPropertyOptional({
    type: Wgs84CoordinatesDto,
    description:
      '사용자 위치에 따른 거리(distance)를 구하기 위한 사용자 위치 좌표',
  })
  @ValidateNested()
  @Type(() => Wgs84CoordinatesDto)
  userLocation?: Wgs84CoordinatesDto | undefined;

  pagination?: Pagination | undefined;

  isBoundSquare(): boolean {
    return !!(
      this.boundSquare?.topRight?.latitude ||
      this.boundSquare?.topRight?.longitude ||
      this.boundSquare?.bottomLeft?.latitude ||
      this.boundSquare?.bottomLeft?.longitude
    );
  }

  isBoundCircle(): boolean {
    return !!(
      this.boundCircle?.center?.latitude ||
      this.boundCircle?.center?.longitude ||
      this.boundCircle?.radiusMeter !== undefined
    );
  }
}

export class ReadPlaceDto
  implements Pick<Place, keyof ReadPlaceListRequest_Place>
{
  @ApiProperty({
    type: String,
    example: '018d4f05-088b-7764-80dc-fafa5124dc78',
    description: 'UUID V7',
  })
  @IsNotEmpty()
  placeId: string;
}
