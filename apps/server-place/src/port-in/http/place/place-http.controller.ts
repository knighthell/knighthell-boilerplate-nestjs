import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
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
import { DeletePlaceRequestDto } from '../../dto/place/delete-place-request.dto';

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
    return this.placeService.createPlaceList(request);
  }

  @Delete('places/:placeId')
  deletePlace(
    @Param() request: DeletePlaceRequestDto,
  ): Promise<DeletePlaceResponse> {
    return this.placeService.deletePlace(request);
  }

  deletePlaceList(
    request: DeletePlaceListRequest,
  ): Promise<DeletePlaceListResponse> {
    return this.placeService.deletePlaceList(request);
  }

  queryPlaceListByRadius(
    request: QueryPlaceListByRadiusRequest,
  ): Promise<QueryPlaceListByRadiusResponse> {
    return this.placeService.queryPlaceListByRadius(request);
  }

  queryPlaceListBySquare(
    request: QueryPlaceListBySquareRequest,
  ): Promise<QueryPlaceListBySquareResponse> {
    return this.placeService.queryPlaceListBySquare(request);
  }

  @Get('places/:placeId')
  readPlace(
    @Param() request: ReadPlaceRequestDto,
  ): Promise<ReadPlaceResponseDto> {
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
