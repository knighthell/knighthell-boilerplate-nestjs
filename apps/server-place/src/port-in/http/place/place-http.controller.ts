import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePlaceListRequestDto } from '../../dto/place/create-place-list/create-place-list-request.dto';
import { CreatePlaceListResponseDto } from '../../dto/place/create-place-list/create-place-list-response.dto';
import { DeletePlaceListRequestDto } from '../../dto/place/delete-place-list/delete-place-list-request.dto';
import { DeletePlaceListResponseDto } from '../../dto/place/delete-place-list/delete-place-list-response.dto';
import { ReadPlaceListRequestDto } from '../../dto/place/read-place-list/read-place-list-request.dto';
import { ReadPlaceListResponseDto } from '../../dto/place/read-place-list/read-place-list-response.dto';
import { UpdatePlaceListRequestDto } from '../../dto/place/update-place-list/update-place-list-request.dto';
import { UpdatePlaceListResponseDto } from '../../dto/place/update-place-list/update-place-list-response.dto';
import { PlaceCreateServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-create.service';
import { PlaceReadServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-read.service';
import { PlaceUpdateServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-update.service';
import { PlaceDeleteServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-delete.service';
import { PlaceCreateService } from '../../../service/place/place-create/place-create.service';
import { PlaceReadService } from '../../../service/place/place-read/place-read.service';
import { PlaceUpdateService } from '../../../service/place/place-update/place-update.service';
import { PlaceDeleteService } from '../../../service/place/place-delete/place-delete.service';

@Controller()
export class PlaceHttpController
  implements
    PlaceCreateServiceController,
    PlaceReadServiceController,
    PlaceUpdateServiceController,
    PlaceDeleteServiceController
{
  private readonly logger = new Logger(PlaceHttpController.name);

  constructor(
    private readonly placeCreateService: PlaceCreateService,
    private readonly placeReadService: PlaceReadService,
    private readonly placeUpdateService: PlaceUpdateService,
    private readonly placeDeleteService: PlaceDeleteService,
  ) {}

  @Post('places')
  createPlaceList(
    @Body() request: CreatePlaceListRequestDto,
  ): Promise<CreatePlaceListResponseDto> {
    return this.placeCreateService.createPlaceList(request);
  }

  @Get('places')
  readPlaceList(
    @Query() request: ReadPlaceListRequestDto,
  ): Promise<ReadPlaceListResponseDto> {
    return this.placeReadService.readPlaceList(request);
  }

  @Put('places')
  updatePlaceList(
    @Body() request: UpdatePlaceListRequestDto,
  ): Promise<UpdatePlaceListResponseDto> {
    return this.placeUpdateService.updatePlaceList(request);
  }

  @Delete('places')
  deletePlaceList(
    @Param() request: DeletePlaceListRequestDto,
  ): Promise<DeletePlaceListResponseDto> {
    return this.placeDeleteService.deletePlaceList(request);
  }
}
