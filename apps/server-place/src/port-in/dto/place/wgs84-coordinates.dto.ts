import { Wgs84Coordinates } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class Wgs84CoordinatesDto implements Wgs84Coordinates {
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
