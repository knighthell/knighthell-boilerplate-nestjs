import { Injectable } from '@nestjs/common';
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

@Injectable()
export class PlaceService {
  createPlace(request: CreatePlaceRequest): Observable<CreatePlaceResponse> {
    return undefined;
  }

  createPlaceList(
    request: CreatePlaceListRequest,
  ): Observable<CreatePlaceListResponse> {
    return undefined;
  }

  deletePlace(request: DeletePlaceRequest): Observable<DeletePlaceResponse> {
    return undefined;
  }

  deletePlaceList(
    request: DeletePlaceListRequest,
  ): Observable<DeletePlaceListResponse> {
    return undefined;
  }

  queryPlaceListByRadius(
    request: QueryPlaceListByRadiusRequest,
  ): Observable<QueryPlaceListByRadiusResponse> {
    return undefined;
  }

  queryPlaceListBySquare(
    request: QueryPlaceListBySquareRequest,
  ): Observable<QueryPlaceListBySquareResponse> {
    return undefined;
  }

  readPlace(request: ReadPlaceRequest): Observable<ReadPlaceResponse> {
    return undefined;
  }

  readPlaceList(
    request: ReadPlaceListRequest,
  ): Observable<ReadPlaceListResponse> {
    return undefined;
  }

  updatePlace(request: UpdatePlaceRequest): Observable<UpdatePlaceResponse> {
    return undefined;
  }

  updatePlaceList(
    request: UpdatePlaceListRequest,
  ): Observable<UpdatePlaceListResponse> {
    return undefined;
  }
}
