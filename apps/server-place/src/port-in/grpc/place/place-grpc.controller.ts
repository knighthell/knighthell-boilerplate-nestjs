import { Controller, Logger } from '@nestjs/common';
import {
  CreatePlaceListRequest,
  CreatePlaceListResponse,
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
import { CreatePlaceRequestDto } from '../../dto/place/create-place-request.dto';
import { CreatePlaceResponseDto } from '../../dto/place/create-place-response.dto';
import { PlaceService } from '../../../service/place/place.service';

@Controller()
@PlaceServiceControllerMethods()
export class PlaceGrpcController implements PlaceServiceController {
  private readonly logger = new Logger(PlaceGrpcController.name);

  constructor(private readonly placeService: PlaceService) {}

  createPlace(
    request: CreatePlaceRequestDto,
    metadata: Metadata,
  ): Promise<CreatePlaceResponseDto> {
    return this.placeService.createPlace(request);
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
    return this.placeService.deletePlace(request);
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
