import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PlaceServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceService } from '../../../service/place/place.service';
import { CreatePlaceListRequestDto } from '../../dto/place/create-place-list/create-place-list-request.dto';
import { CreatePlaceListResponseDto } from '../../dto/place/create-place-list/create-place-list-response.dto';
import { DeletePlaceListRequestDto } from '../../dto/place/delete-place-list/delete-place-list-request.dto';
import { DeletePlaceListResponseDto } from '../../dto/place/delete-place-list/delete-place-list-response.dto';
import { ReadPlaceListRequestDto } from '../../dto/place/read-place-list/read-place-list-request.dto';
import { ReadPlaceListResponseDto } from '../../dto/place/read-place-list/read-place-list-response.dto';
import { UpdatePlaceListRequestDto } from '../../dto/place/update-place-list/update-place-list-request.dto';
import { UpdatePlaceListResponseDto } from '../../dto/place/update-place-list/update-place-list-response.dto';

@Controller()
export class PlaceHttpController implements PlaceServiceController {
  private readonly logger = new Logger(PlaceHttpController.name);

  constructor(private readonly placeService: PlaceService) {}

  @Post('places')
  createPlaceList(
    @Body() request: CreatePlaceListRequestDto,
  ): Promise<CreatePlaceListResponseDto> {
    return this.placeService.createPlaceList(request);
  }

  @Delete('places')
  deletePlaceList(
    @Param() request: DeletePlaceListRequestDto,
  ): Promise<DeletePlaceListResponseDto> {
    return this.placeService.deletePlaceList(request);
  }

  @Get('places')
  readPlaceList(
    @Query() request: ReadPlaceListRequestDto,
  ): Promise<ReadPlaceListResponseDto> {
    return this.placeService.readPlaceList(request);
  }

  updatePlaceList(
    @Body() request: UpdatePlaceListRequestDto,
  ): Promise<UpdatePlaceListResponseDto> {
    return this.placeService.updatePlaceList(request);
  }
}
