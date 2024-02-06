import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../../../domain/place/place.entity';
import { PlaceCreateServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-create.service';
import { CreatePlaceListResponseDto } from '../../../port-in/dto/place/create-place-list/create-place-list-response.dto';
import { CreatePlaceListRequestDto } from '../../../port-in/dto/place/create-place-list/create-place-list-request.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PlaceCreateService implements PlaceCreateServiceController {
  private readonly logger = new Logger(PlaceCreateService.name);

  constructor(private readonly placeRepository: Repository<PlaceEntity>) {}

  async createPlaceList(
    request: CreatePlaceListRequestDto,
  ): Promise<CreatePlaceListResponseDto> {
    const creatablePlaceEntities = request.places.map((createPlaceRequest) => {
      const creatablePlaceEntity = this.placeRepository.create({
        ...createPlaceRequest,
      });

      creatablePlaceEntity.latitude = createPlaceRequest.latitude;
      creatablePlaceEntity.longitude = createPlaceRequest.longitude;

      creatablePlaceEntity.geom = {
        type: 'Point',
        coordinates: [
          createPlaceRequest.longitude,
          createPlaceRequest.latitude,
        ],
      };

      return creatablePlaceEntity;
    });
    this.logger.debug(creatablePlaceEntities, 'creatablePlaceEntities');

    const createdPlaceEntities = await this.placeRepository.save(
      creatablePlaceEntities,
    );
    this.logger.debug(createdPlaceEntities, 'createdPlaceEntities');

    return plainToInstance(CreatePlaceListResponseDto, {
      results: createdPlaceEntities,
    } as CreatePlaceListResponseDto);
  }
}
