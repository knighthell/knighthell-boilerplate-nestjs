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
    return this.placeService.createPlaceList(request);
  }

  deletePlace(request: DeletePlaceRequest): Promise<DeletePlaceResponse> {
    return this.placeService.deletePlace(request);
  }

  deletePlaceList(
    request: DeletePlaceListRequest,
  ): Promise<DeletePlaceListResponse> {
    return this.placeService.deletePlaceList(request);
  }

  queryPlaceListByRadius(
    request: QueryPlaceListByRadiusRequest,
  ): Promise<QueryPlaceListResponse> {
    return this.placeService.queryPlaceListByRadius(request);
  }

  queryPlaceListBySquare(
    request: QueryPlaceListBySquareRequest,
  ): Promise<QueryPlaceListResponse> {
    return this.placeService.queryPlaceListBySquare(request);
  }

  readPlace(request: ReadPlaceRequest): Promise<ReadPlaceResponse> {
    return this.placeService.readPlace(request);
  }

  readPlaceList(request: ReadPlaceListRequest): Promise<ReadPlaceListResponse> {
    return this.placeService.readPlaceList(request);
  }

  updatePlace(request: UpdatePlaceRequest): Promise<UpdatePlaceResponse> {
    return this.placeService.updatePlace(request);
  }

  updatePlaceList(
    request: UpdatePlaceListRequest,
  ): Promise<UpdatePlaceListResponse> {
    return this.placeService.updatePlaceList(request);
  }
}
