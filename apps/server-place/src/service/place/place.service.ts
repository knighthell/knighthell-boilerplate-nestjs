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
  QueryPlaceListByRadiusResponse,
  QueryPlaceListBySquareRequest,
  QueryPlaceListBySquareResponse,
  ReadPlaceListRequest,
  ReadPlaceListResponse,
  ReadPlaceRequest,
  ReadPlaceResponse,
  UpdatePlaceListRequest,
  UpdatePlaceListResponse,
  UpdatePlaceRequest,
  UpdatePlaceResponse,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../../domain/place/place.entity';
import { UnsupportedServiceMethodException } from '@knighthell-boilerplate-nestjs/common';

@Injectable()
export class PlaceService {
  private readonly logger = new Logger(PlaceService.name);

  async createPlace(request: CreatePlaceRequest): Promise<CreatePlaceResponse> {
    const creatablePlace = PlaceEntity.create({ ...request });

    const createdPlace = await PlaceEntity.save(creatablePlace);

    return {
      place: createdPlace,
    };
  }

  createPlaceList(
    request: CreatePlaceListRequest,
  ): Observable<CreatePlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }

  async deletePlace(request: DeletePlaceRequest): Promise<DeletePlaceResponse> {
    const existPlace = await PlaceEntity.preload({ ...request });

    const removedPlace = await PlaceEntity.softRemove(existPlace);

    return {
      place: removedPlace,
    };
  }

  deletePlaceList(
    request: DeletePlaceListRequest,
  ): Promise<DeletePlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }

  queryPlaceListByRadius(
    request: QueryPlaceListByRadiusRequest,
  ): Promise<QueryPlaceListByRadiusResponse> {
    return undefined;
  }

  async queryPlaceListBySquare(
    request: QueryPlaceListBySquareRequest,
  ): Promise<QueryPlaceListBySquareResponse> {
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

    return {
      results: places,
    };
  }

  readPlace(request: ReadPlaceRequest): Promise<ReadPlaceResponse> {
    return undefined;
  }

  readPlaceList(
    request: ReadPlaceListRequest,
  ): Observable<ReadPlaceListResponse> {
    return undefined;
  }

  updatePlace(request: UpdatePlaceRequest): Promise<UpdatePlaceResponse> {
    return undefined;
  }

  updatePlaceList(
    request: UpdatePlaceListRequest,
  ): Promise<UpdatePlaceListResponse> {
    return undefined;
  }
}
