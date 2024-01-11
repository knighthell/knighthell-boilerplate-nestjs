import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  CreatePlaceListRequest,
  CreatePlaceListResponse,
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
  UpdatePlaceListRequest,
  UpdatePlaceListResponse,
  UpdatePlaceRequest,
  UpdatePlaceResponse,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { UnsupportedServiceMethodException } from '@knighthell-boilerplate-nestjs/common';
import { CreatePlaceRequestDto } from '../../dto/place/create-place-request.dto';
import { PlaceService } from '../../../service/place/place.service';
import { ReadPlaceRequestDto } from '../../dto/place/read-place-request.dto';
import { ReadPlaceResponseDto } from '../../dto/place/read-place-response.dto';

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

  @Get('places/:placeId')
  readPlace(
    @Param() request: ReadPlaceRequestDto,
  ): Promise<ReadPlaceResponseDto> {
    return this.placeService.readPlace(request);
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
