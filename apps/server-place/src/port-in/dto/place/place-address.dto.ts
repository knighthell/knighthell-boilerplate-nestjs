import { PlaceAddress } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { IsOptional, IsString } from 'class-validator';

export class PlaceAddressDto implements PlaceAddress {
  @IsOptional()
  @IsString()
  roadNameAddress?: string | undefined;

  @IsOptional()
  @IsString()
  lotNumberAddress?: string | undefined;
}
