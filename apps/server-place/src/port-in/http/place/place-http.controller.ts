import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreatePlaceListRequest,
  CreatePlaceListResponse,
  DeletePlaceListRequest,
  DeletePlaceListResponse,
  PlaceServiceController,
  QueryPlaceListByRadiusRequest,
  QueryPlaceListBySquareRequest,
  QueryPlaceListResponse,
  ReadPlaceListRequest,
  ReadPlaceListResponse,
  UpdatePlaceListRequest,
  UpdatePlaceListResponse,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { CreatePlaceRequestDto } from '../../dto/place/create-place-request.dto';
import { PlaceService } from '../../../service/place/place.service';
import { ReadPlaceRequestDto } from '../../dto/place/read-place-request.dto';
import { ReadPlaceResponseDto } from '../../dto/place/read-place-response.dto';
import { DeletePlaceRequestDto } from '../../dto/place/delete-place-request.dto';
import { CreatePlaceResponseDto } from '../../dto/place/create-place-response.dto';
import { DeletePlaceResponseDto } from '../../dto/place/delete-place-response.dto';
import { UpdatePlaceRequestDto } from '../../dto/place/update-place-request.dto';
import { UpdatePlaceResponseDto } from '../../dto/place/update-place-response.dto';

@Controller()
export class PlaceHttpController implements PlaceServiceController {
  private readonly logger = new Logger(PlaceHttpController.name);

  constructor(private readonly placeService: PlaceService) {}

  @Post('places')
  createPlace(
    @Body() request: CreatePlaceRequestDto,
  ): Promise<CreatePlaceResponseDto> {
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
  ): Promise<DeletePlaceResponseDto> {
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

  @Get('places/:placeId')
  readPlace(
    @Param() request: ReadPlaceRequestDto,
  ): Promise<ReadPlaceResponseDto> {
    return this.placeService.readPlace(request);
  }

  readPlaceList(request: ReadPlaceListRequest): Promise<ReadPlaceListResponse> {
    return this.placeService.readPlaceList(request);
  }

  @Put('places/:placeId')
  updatePlace(
    @Body() request: UpdatePlaceRequestDto,
    @Param('placeId') placeId: string,
  ): Promise<UpdatePlaceResponseDto> {
    request.placeId = placeId;

    return this.placeService.updatePlace(request);
  }

  updatePlaceList(
    request: UpdatePlaceListRequest,
  ): Promise<UpdatePlaceListResponse> {
    return this.placeService.updatePlaceList(request);
  }
}
