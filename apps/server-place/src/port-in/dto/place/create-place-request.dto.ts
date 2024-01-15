import { CreatePlaceRequest } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { Place } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlaceRequestDto
  implements Omit<CreatePlaceRequest, 'placeId'>
{
  @IsNotEmpty()
  @IsString()
  @Length(2, 1000)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90.0)
  @Max(90.0)
  @Type(() => Number)
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180.0)
  @Max(180.0)
  @Type(() => Number)
  longitude: number;
}
