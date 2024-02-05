import { Injectable, Logger } from '@nestjs/common';
import { PlaceDeleteServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-delete.service';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../../../domain/place/place.entity';
import { UnsupportedServiceMethodException } from '@knighthell-boilerplate-nestjs/common';
import { DeletePlaceListRequestDto } from '../../../port-in/dto/place/delete-place-list/delete-place-list-request.dto';
import { DeletePlaceListResponseDto } from '../../../port-in/dto/place/delete-place-list/delete-place-list-response.dto';

@Injectable()
export class PlaceDeleteService implements PlaceDeleteServiceController {
  private readonly logger = new Logger(PlaceDeleteService.name);

  constructor(private readonly placeRepository: Repository<PlaceEntity>) {}

  async deletePlaceList(
    request: DeletePlaceListRequestDto,
  ): Promise<DeletePlaceListResponseDto> {
    throw new UnsupportedServiceMethodException();
  }
}
