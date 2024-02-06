import { Wgs84CoordinatesDto } from '../wgs84-coordinates.dto';
import { IsNotEmpty, IsNumber, IsObject, Max, Min } from 'class-validator';
import { BoundCircle } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-read.service';

export class BoundCircleDto implements BoundCircle {
  @IsNotEmpty()
  @IsObject()
  center: Wgs84CoordinatesDto | undefined;

  @IsNumber()
  @Min(1)
  @Max(1_000_000)
  radiusMeter: number;
}
