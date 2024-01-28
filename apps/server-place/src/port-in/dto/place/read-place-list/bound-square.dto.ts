import { BoundSquare } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { Wgs84CoordinatesDto } from '../wgs84-coordinates.dto';
import { IsNotEmpty, IsObject } from 'class-validator';

export class BoundSquareDto implements BoundSquare {
  @IsNotEmpty()
  @IsObject()
  topRight: Wgs84CoordinatesDto | undefined;

  @IsNotEmpty()
  @IsObject()
  bottomLeft: Wgs84CoordinatesDto | undefined;
}
