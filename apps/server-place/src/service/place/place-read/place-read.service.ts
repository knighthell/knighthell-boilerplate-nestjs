import { Injectable, Logger } from '@nestjs/common';
import { PlaceReadServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-read.service';
import { In, Repository } from 'typeorm';
import { PlaceEntity } from '../../../domain/place/place.entity';
import { ReadPlaceListRequestDto } from '../../../port-in/dto/place/read-place-list/read-place-list-request.dto';
import { ReadPlaceListResponseDto } from '../../../port-in/dto/place/read-place-list/read-place-list-response.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaceReadService implements PlaceReadServiceController {
  private readonly logger = new Logger(PlaceReadService.name);

  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
  ) {}

  async readPlaceList(
    request: ReadPlaceListRequestDto,
  ): Promise<ReadPlaceListResponseDto> {
    const placeQueryBuilder = this.placeRepository
      .createQueryBuilder('place')
      .orderBy({ name: 'ASC' }); // 기본 정렬은 이름 오름차순

    if (request.places.length) {
      const requestPlaceIds = request.places.map((place) => place.placeId);
      placeQueryBuilder.andWhere({
        placeId: In(requestPlaceIds),
      });
    }

    if (request.isBoundSquare()) {
      placeQueryBuilder.andWhere(
        'place."geom" && ST_MakeEnvelope(:left, :bottom, :right, :top, 4326)',
        {
          top: request.boundSquare.topRight.latitude,
          right: request.boundSquare.topRight.longitude,
          bottom: request.boundSquare.bottomLeft.latitude,
          left: request.boundSquare.bottomLeft.longitude,
        },
      );
    }

    if (request.isBoundCircle()) {
      placeQueryBuilder.andWhere(
        'ST_DWithin(place."geom", ST_GeomFromGeoJSON(:centerLocation), :radiusMeter)',
        {
          centerLocation: JSON.stringify({
            type: 'Point',
            coordinates: [
              request.boundCircle.center.longitude,
              request.boundCircle.center.latitude,
            ],
          }),
        },
      );
    }

    if (request.userLocation) {
      placeQueryBuilder
        .addSelect(
          'ROUND(ST_Distance(place."geom", ST_GeomFromGeoJSON(:userLocation), true)::NUMERIC)',
          'distance',
        )
        .setParameters({
          userLocation: JSON.stringify({
            type: 'Point',
            coordinates: [
              request.userLocation.longitude,
              request.userLocation.latitude,
            ],
          }),
        })
        .orderBy({
          distance: {
            order: 'ASC',
            nulls: 'NULLS FIRST',
          },
        });
    }

    const [existPlaceEntities, totalCount] = await placeQueryBuilder
      .getManyAndCount()
      .catch((error) => {
        this.logger.error(error);
        throw error;
      });

    existPlaceEntities.forEach((existPlaceEntity) => {
      existPlaceEntity.latitude = existPlaceEntity.geom.coordinates[1];
      existPlaceEntity.longitude = existPlaceEntity.geom.coordinates[0];
    });

    return plainToInstance(ReadPlaceListResponseDto, {
      responseInfo: {
        totalCount,
        resultCount: existPlaceEntities.length,
      },
      results: existPlaceEntities,
    } as ReadPlaceListResponseDto);
  }
}
