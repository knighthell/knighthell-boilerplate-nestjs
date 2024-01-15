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
import { CreatePlaceRequestDto } from '../../dto/place/create-place-request.dto';
import { CreatePlaceResponseDto } from '../../dto/place/create-place-response.dto';
import { PlaceService } from '../../../service/place/place.service';

@Controller()
@PlaceServiceControllerMethods()
export class PlaceGrpcController implements PlaceServiceController {
  private readonly logger = new Logger(PlaceGrpcController.name);

  constructor(private readonly placeService: PlaceService) {}

  createPlace(request: CreatePlaceRequestDto): Promise<CreatePlaceResponseDto> {
    return this.placeService.createPlace(request);
  }

  createPlaceList(
    request: CreatePlaceListRequest,
  ): Promise<CreatePlaceListResponse> {
    return undefined;
  }

  deletePlace(request: DeletePlaceRequest): Promise<DeletePlaceResponse> {
    return this.placeService.deletePlace(request);
  }

  deletePlaceList(
    request: DeletePlaceListRequest,
  ): Promise<DeletePlaceListResponse> {
    return undefined;
  }

  queryPlaceListByRadius(
    request: QueryPlaceListByRadiusRequest,
  ): Promise<QueryPlaceListResponse> {
    return undefined;
  }

  queryPlaceListBySquare(
    request: QueryPlaceListBySquareRequest,
  ): Promise<QueryPlaceListResponse> {
    return undefined;
  }

  readPlace(request: ReadPlaceRequest): Promise<ReadPlaceResponse> {
    return undefined;
  }

  readPlaceList(request: ReadPlaceListRequest): Promise<ReadPlaceListResponse> {
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
