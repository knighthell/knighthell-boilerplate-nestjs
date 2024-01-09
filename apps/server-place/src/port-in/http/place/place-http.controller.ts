import { Body, Controller, Logger, Post } from '@nestjs/common';
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
import { UnsupportedServiceMethodException } from '@knighthell-boilerplate-nestjs/common';
import { CreatePlaceRequestDto } from '../../dto/place/create-place-request.dto';
import { PlaceService } from '../../../service/place/place.service';

@Controller()
export class PlaceHttpController implements PlaceServiceController {
  private readonly logger = new Logger(PlaceHttpController.name);

  constructor(private readonly placeService: PlaceService) {}

  @Post('places')
  createPlace(
    @Body() request: CreatePlaceRequestDto,
  ): Promise<CreatePlaceResponse> {
    return this.placeService.createPlace(request);
  }

  createPlaceList(
    request: CreatePlaceListRequest,
  ): Promise<CreatePlaceListResponse> {
    throw new UnsupportedServiceMethodException();
  }

  deletePlace(request: DeletePlaceRequest): Promise<DeletePlaceResponse> {
    return undefined;
  }

  deletePlaceList(
    request: DeletePlaceListRequest,
  ): Promise<DeletePlaceListResponse> {
    return undefined;
  }

  queryPlaceListByRadius(
    request: QueryPlaceListByRadiusRequest,
  ): Promise<QueryPlaceListByRadiusResponse> {
    return undefined;
  }

  queryPlaceListBySquare(
    request: QueryPlaceListBySquareRequest,
  ): Promise<QueryPlaceListBySquareResponse> {
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
