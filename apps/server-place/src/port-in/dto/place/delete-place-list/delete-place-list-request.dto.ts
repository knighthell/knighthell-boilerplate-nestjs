import {
  DeletePlaceListRequest,
  DeletePlaceListRequest_Place,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DeletePlaceListRequestDto implements DeletePlaceListRequest {
  @ApiPropertyOptional({
    type: Array<DeletePlaceDto>,
    description: '장소 ID로 삭제시 사용',
  })
  @ValidateNested()
  @Type(() => Array<DeletePlaceDto>)
  places: DeletePlaceDto[];
}

export class DeletePlaceDto implements DeletePlaceListRequest_Place {
  @ApiProperty({
    type: String,
    example: '018d4f05-088b-7764-80dc-fafa5124dc78',
    description: 'UUID V7',
  })
  @IsNotEmpty()
  placeId: string;
}
