import {
  UpdatePlaceListRequest,
  UpdatePlaceListRequest_Place,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { Place } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePlaceListRequestDto implements UpdatePlaceListRequest {
  @ValidateNested()
  @Type(() => UpdatePlaceDto)
  places: UpdatePlaceDto[];
}

export class UpdatePlaceDto
  implements Pick<Partial<Place>, keyof UpdatePlaceListRequest_Place>
{
  placeId: string;

  @ApiPropertyOptional({
    type: String,
    example: 'MINOS Coffee cult',
    minLength: 2,
    maxLength: 1000,
  })
  @IsString()
  @Length(2, 1000)
  name?: string | undefined;

  @ApiPropertyOptional({
    type: Number,
    example: 37.5231776,
    maximum: 90.0,
    minimum: -90.0,
  })
  @IsNumber()
  @Min(-90.0)
  @Max(90.0)
  @Type(() => Number)
  latitude?: number | undefined;

  @ApiPropertyOptional({
    type: Number,
    example: 127.0226903,
    maximum: 180.0,
    minimum: -180.0,
  })
  @IsNumber()
  @Min(-180.0)
  @Max(180.0)
  @Type(() => Number)
  longitude?: number | undefined;
}
