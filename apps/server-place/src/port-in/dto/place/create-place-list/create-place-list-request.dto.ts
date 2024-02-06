import { Place } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreatePlaceListRequest,
  CreatePlaceListRequest_Place,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place-create.service';

export class CreatePlaceListRequestDto implements CreatePlaceListRequest {
  places: CreatePlaceDto[];
}

export class CreatePlaceDto
  implements Pick<Place, keyof CreatePlaceListRequest_Place>
{
  @ApiProperty({
    type: String,
    example: 'MINOS Coffee cult',
    minLength: 2,
    maxLength: 1000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 1000)
  name: string;

  @ApiProperty({
    type: Number,
    example: 37.5231776,
    maximum: 90.0,
    minimum: -90.0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(-90.0)
  @Max(90.0)
  @Type(() => Number)
  latitude: number;

  @ApiProperty({
    type: Number,
    example: 127.0226903,
    maximum: 180.0,
    minimum: -180.0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(-180.0)
  @Max(180.0)
  @Type(() => Number)
  longitude: number;
}
