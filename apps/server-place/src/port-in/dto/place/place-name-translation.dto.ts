import { PlaceNameTranslation } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { IsOptional, IsString, Length } from 'class-validator';

export class PlaceNameTranslationDto implements PlaceNameTranslation {
  @IsOptional()
  @IsString()
  @Length(2, 1000)
  ko?: string | undefined;

  @IsOptional()
  @IsString()
  @Length(2, 1000)
  en?: string | undefined;

  @IsOptional()
  @IsString()
  @Length(2, 1000)
  ja?: string | undefined;

  @IsOptional()
  @IsString()
  @Length(2, 1000)
  zh?: string | undefined;
}
