import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  DeletePlaceListRequest,
  DeletePlaceListResponse,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { In, Repository } from 'typeorm';
import { PlaceEntity } from '../../domain/place/place.entity';
import { UnsupportedServiceMethodException } from '@knighthell-boilerplate-nestjs/common';
import { CreatePlaceListRequestDto } from '../../port-in/dto/place/create-place-list/create-place-list-request.dto';
import { CreatePlaceListResponseDto } from '../../port-in/dto/place/create-place-list/create-place-list-response.dto';
import { UpdatePlaceListRequestDto } from '../../port-in/dto/place/update-place-list/update-place-list-request.dto';
import { UpdatePlaceListResponseDto } from '../../port-in/dto/place/update-place-list/update-place-list-response.dto';
import { ReadPlaceListResponseDto } from '../../port-in/dto/place/read-place-list/read-place-list-response.dto';
import { ReadPlaceListRequestDto } from '../../port-in/dto/place/read-place-list/read-place-list-request.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PlaceService {
  private readonly logger = new Logger(PlaceService.name);

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

    const createdPlaceEntity = await this.placeRepository.save(
      creatablePlaceEntities,
    );
    this.logger.debug(createdPlaceEntity, 'createdPlaceEntity');

    return plainToInstance(CreatePlaceListResponseDto, {
      results: createdPlaceEntity,
    } as CreatePlaceListResponseDto);
  }

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

  async updatePlaceList(
    request: UpdatePlaceListRequestDto,
  ): Promise<UpdatePlaceListResponseDto> {
    const requestPlaceIds = request.places.map((place) => place.placeId);

    const existPlaceEntities = await this.placeRepository.find({
      where: { placeId: In(requestPlaceIds) },
    });

    if (request.places.length !== existPlaceEntities.length) {
      const existPlaceEntityIds = existPlaceEntities.map(
        (place) => place.placeId,
      );
      const differenceIds = new Set(
        requestPlaceIds.filter((x) => !new Set(existPlaceEntityIds).has(x)),
      );
      throw new HttpException(
        `NOT EXIST Places(ids: ${differenceIds})`,
        HttpStatus.NO_CONTENT,
      );
    }

    const mergedPlaceEntities = existPlaceEntities.map((eixstPlace) =>
      this.placeRepository.merge(eixstPlace, {
        ...request.places.find(
          (requestPlace) => requestPlace.placeId === eixstPlace.placeId,
        ),
      }),
    );

    const savedPlaceEntities = await this.placeRepository.save(
      mergedPlaceEntities,
    );

    return plainToInstance(UpdatePlaceListResponseDto, {
      results: savedPlaceEntities,
    } as UpdatePlaceListResponseDto);
  }

  async deletePlaceList(
    request: DeletePlaceListRequest,
  ): Promise<DeletePlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }
}
