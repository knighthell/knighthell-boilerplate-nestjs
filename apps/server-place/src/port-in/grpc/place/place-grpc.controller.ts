import { Controller } from '@nestjs/common';
import {
  CreatePlaceListRequest,
  CreatePlaceListResponse,
  CreatePlaceRequest,
  CreatePlaceResponse,
  DeletePlaceListRequest,
  DeletePlaceListResponse,
  DeletePlaceRequest,
  DeletePlaceResponse,
  PlaceServiceController,
  PlaceServiceControllerMethods,
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
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

@Controller()
@PlaceServiceControllerMethods()
export class PlaceGrpcController implements PlaceServiceController {
  createPlace(
    request: CreatePlaceRequest,
    metadata: Metadata,
  ): Promise<CreatePlaceResponse> {
    return undefined;
  }

  createPlaceList(
    request: CreatePlaceListRequest,
    metadata: Metadata,
  ): Promise<CreatePlaceListResponse> {
    return undefined;
  }

  deletePlace(
    request: DeletePlaceRequest,
    metadata: Metadata,
  ): Promise<DeletePlaceResponse> {
    return undefined;
  }

  deletePlaceList(
    request: DeletePlaceListRequest,
    metadata: Metadata,
  ): Promise<DeletePlaceListResponse> {
    return undefined;
  }

  queryPlaceListByRadius(
    request: QueryPlaceListByRadiusRequest,
    metadata: Metadata,
  ): Promise<QueryPlaceListByRadiusResponse> {
    return undefined;
  }

  queryPlaceListBySquare(
    request: QueryPlaceListBySquareRequest,
    metadata: Metadata,
  ): Promise<QueryPlaceListBySquareResponse> {
    return undefined;
  }

  readPlace(
    request: ReadPlaceRequest,
    metadata: Metadata,
  ): Promise<ReadPlaceResponse> {
    return undefined;
  }

  readPlaceList(
    request: ReadPlaceListRequest,
    metadata: Metadata,
  ): Promise<ReadPlaceListResponse> {
    return undefined;
  }

  updatePlace(
    request: UpdatePlaceRequest,
    metadata: Metadata,
  ): Promise<UpdatePlaceResponse> {
    return undefined;
  }

  updatePlaceList(
    request: UpdatePlaceListRequest,
    metadata: Metadata,
  ): Promise<UpdatePlaceListResponse> {
    return undefined;
  }
}
