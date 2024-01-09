import {
  Place,
  PlaceAddress,
  PlaceNameTranslation,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { PlaceUser } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-user';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Transform, TransformationType, Type } from 'class-transformer';
import { PlaceUserDto } from '../place-user/place-user.dto';
import { PlaceNameTranslationDto } from './place-name-translation.dto';
import { PlaceAddressDto } from './place-address.dto';
import { wrappers } from 'protobufjs';

export class PlaceDto implements Place {
  @IsUUID()
  @IsString()
  id: string;

  @IsNumber()
  @Min(-90.0)
  @Max(90.0)
  @Type(() => Number)
  latitude: number;

  @IsNumber()
  @Min(-180.0)
  @Max(180.0)
  @Type(() => Number)
  longitude: number;

  @ValidateNested()
  @Type(() => PlaceUserDto)
  createdBy: PlaceUserDto | undefined;

  createdAt: Date | undefined;

  @ValidateNested()
  @Type(() => PlaceUserDto)
  updatedBy: PlaceUserDto | undefined;

  updatedAt: Date | undefined;

  @ValidateNested()
  @Type(() => PlaceUserDto)
  deletedBy?: PlaceUserDto | undefined;

  @IsDate()
  // @Transform(({ type, value }) => {
  //   switch (type) {
  //     case TransformationType.PLAIN_TO_CLASS:
  //       return wrappers['.google.protobuf.Timestamp'].toObject(value);
  //     case TransformationType.CLASS_TO_PLAIN:
  //       return wrappers['.google.protobuf.Timestamp'].fromObject(value);
  //   }
  // })
  deletedAt?: Date | undefined;

  @IsString()
  @Length(2, 1000)
  name: string;

  @ValidateNested()
  @Type(() => PlaceNameTranslationDto)
  nameTranslation?: PlaceNameTranslationDto | undefined;

  @ValidateNested()
  @Type(() => PlaceAddressDto)
  address?: PlaceAddressDto | undefined;
}
