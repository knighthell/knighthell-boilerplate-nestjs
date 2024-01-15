import { Injectable, Logger } from '@nestjs/common';
import {
  CreatePlaceListRequest,
  CreatePlaceListResponse,
  CreatePlaceRequest,
  CreatePlaceResponse,
  DeletePlaceListRequest,
  DeletePlaceListResponse,
  DeletePlaceRequest,
  DeletePlaceResponse,
  QueryPlaceListByRadiusRequest,
  QueryPlaceListBySquareRequest,
  QueryPlaceListResponse,
  ReadPlaceListRequest,
  ReadPlaceListResponse,
  ReadPlaceRequest,
  ReadPlaceResponse,
  UpdatePlaceListRequest,
  UpdatePlaceListResponse,
  UpdatePlaceRequest,
  UpdatePlaceResponse,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceEntity } from '../../domain/place/place.entity';
import { UnsupportedServiceMethodException } from '@knighthell-boilerplate-nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreatePlaceResponseDto } from '../../port-in/dto/place/create-place-response.dto';
import { DeletePlaceResponseDto } from '../../port-in/dto/place/delete-place-response.dto';
import { UpdatePlaceResponseDto } from '../../port-in/dto/place/update-place-response.dto';
import { ReadPlaceResponseDto } from '../../port-in/dto/place/read-place-response.dto';
import { QueryPlaceListResponseDto } from '../../port-in/dto/place/query-place-list-response.dto';

@Injectable()
export class PlaceService {
  private readonly logger = new Logger(PlaceService.name);

  async createPlace(request: CreatePlaceRequest): Promise<CreatePlaceResponse> {
    const creatablePlace = PlaceEntity.create({ ...request });

    creatablePlace.latitude = request.latitude;
    creatablePlace.longitude = request.longitude;

    creatablePlace.geom = {
      type: 'Point',
      coordinates: [request.longitude, request.latitude],
    };

    const createdPlace = await PlaceEntity.save(creatablePlace);
    this.logger.debug(createdPlace, 'createdPlace');

    return plainToInstance(CreatePlaceResponseDto, {
      place: createdPlace,
    });
  }

  async createPlaceList(
    request: CreatePlaceListRequest,
  ): Promise<CreatePlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }

  async deletePlace(request: DeletePlaceRequest): Promise<DeletePlaceResponse> {
    const existPlace = await PlaceEntity.findOneByOrFail({
      placeId: request.placeId,
    });

    const removedPlace = await PlaceEntity.softRemove(existPlace);

    return plainToInstance(DeletePlaceResponseDto, {
      place: removedPlace,
    });
  }

  async deletePlaceList(
    request: DeletePlaceListRequest,
  ): Promise<DeletePlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }

  async queryPlaceListByRadius(
    request: QueryPlaceListByRadiusRequest,
  ): Promise<QueryPlaceListResponse> {
    return undefined;
  }

  async queryPlaceListBySquare(
    request: QueryPlaceListBySquareRequest,
  ): Promise<QueryPlaceListResponse> {
    const [places, count] = await PlaceEntity.createQueryBuilder('place')
      .addSelect(
        'ROUND(ST_Distance(place."geom", ST_GeomFromGeoJSON(:userLocation), true)::NUMERIC)',
        'distance',
      )
      .orderBy({
        distance: {
          order: 'ASC',
          nulls: 'NULLS FIRST',
        },
      })
      .where('ST_MakeEnvelope(:left, :bottom, :right, :top, 4326)', {
        top: request.topRightLatitude,
        right: request.topRightLongitude,
        bottom: request.bottomLeftLatitude,
        left: request.bottomLeftLongitude,
      })
      .setParameters({
        userLocation:
          request.userLatitude !== undefined &&
          request.userLongitude !== undefined
            ? JSON.stringify({
                type: 'Point',
                coordinates: [request.userLongitude, request.userLatitude],
              })
            : null,
      })
      .getManyAndCount()
      .catch((error) => {
        this.logger.error(error);
        throw error;
      });

    return plainToInstance(QueryPlaceListResponseDto, {
      results: places,
    });
  }

  async readPlace(request: ReadPlaceRequest): Promise<ReadPlaceResponse> {
    const place = await PlaceEntity.findOneByOrFail({
      placeId: request.placeId,
    });

    place.latitude = place.geom.coordinates[1];
    place.longitude = place.geom.coordinates[0];

    return plainToInstance(ReadPlaceResponseDto, {
      place,
    });
  }

  async readPlaceList(
    request: ReadPlaceListRequest,
  ): Promise<ReadPlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }

  async updatePlace(request: UpdatePlaceRequest): Promise<UpdatePlaceResponse> {
    const existPlace = await PlaceEntity.findOneByOrFail({
      placeId: request.placeId,
    });

    const mergedPlace = PlaceEntity.merge(existPlace, { ...request });

    const updatedPlace = await mergedPlace.save();

    return plainToInstance(UpdatePlaceResponseDto, { place: updatedPlace });
  }

  async updatePlaceList(
    request: UpdatePlaceListRequest,
  ): Promise<UpdatePlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }
}
