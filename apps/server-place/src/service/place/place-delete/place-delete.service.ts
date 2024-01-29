import { Injectable, Logger } from '@nestjs/common';
import { PlaceDeleteServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-delete.service';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../../../domain/place/place.entity';
import {
  DeletePlaceListRequest,
  DeletePlaceListResponse,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { UnsupportedServiceMethodException } from '@knighthell-boilerplate-nestjs/common';

@Injectable()
export class PlaceDeleteService implements PlaceDeleteServiceController {
  private readonly logger = new Logger(PlaceDeleteService.name);

  constructor(private readonly placeRepository: Repository<PlaceEntity>) {}

  async deletePlaceList(
    request: DeletePlaceListRequest,
  ): Promise<DeletePlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }
}
