import { Controller, Logger } from '@nestjs/common';
import {
  PlaceServiceController,
  PlaceServiceControllerMethods,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { PlaceService } from '../../../service/place/place.service';
import { ReadPlaceListRequestDto } from '../../dto/place/read-place-list/read-place-list-request.dto';
import { DeletePlaceListRequestDto } from '../../dto/place/delete-place-list/delete-place-list-request.dto';
import { DeletePlaceListResponseDto } from '../../dto/place/delete-place-list/delete-place-list-response.dto';
import { CreatePlaceListRequestDto } from '../../dto/place/create-place-list/create-place-list-request.dto';
import { CreatePlaceListResponseDto } from '../../dto/place/create-place-list/create-place-list-response.dto';
import { UpdatePlaceListRequestDto } from '../../dto/place/update-place-list/update-place-list-request.dto';
import { UpdatePlaceListResponseDto } from '../../dto/place/update-place-list/update-place-list-response.dto';
import { ReadPlaceListResponseDto } from '../../dto/place/read-place-list/read-place-list-response.dto';
import {
  PlaceCreateServiceController,
  PlaceCreateServiceControllerMethods,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place-create.service';
import {
  PlaceReadServiceController,
  PlaceReadServiceControllerMethods,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place-read.service';
import {
  PlaceUpdateServiceController,
  PlaceUpdateServiceControllerMethods,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place-update.service';
import {
  PlaceDeleteServiceController,
  PlaceDeleteServiceControllerMethods,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place-delete.service';
import { PlaceCreateService } from '../../../service/place/place-create/place-create.service';
import { PlaceReadService } from '../../../service/place/place-read/place-read.service';
import { PlaceUpdateService } from '../../../service/place/place-update/place-update.service';
import { PlaceDeleteService } from '../../../service/place/place-delete/place-delete.service';

@Controller()
@PlaceCreateServiceControllerMethods()
@PlaceReadServiceControllerMethods()
@PlaceUpdateServiceControllerMethods()
@PlaceDeleteServiceControllerMethods()
export class PlaceGrpcController
  implements
    PlaceCreateServiceController,
    PlaceReadServiceController,
    PlaceUpdateServiceController,
    PlaceDeleteServiceController
{
  private readonly logger = new Logger(PlaceGrpcController.name);

  constructor(
    private readonly placeCreateService: PlaceCreateService,
    private readonly placeReadService: PlaceReadService,
    private readonly placeUpdateService: PlaceUpdateService,
    private readonly placeDeleteService: PlaceDeleteService,
  ) {}

  createPlaceList(
    request: CreatePlaceListRequestDto,
  ): Promise<CreatePlaceListResponseDto> {
    return this.placeCreateService.createPlaceList(request);
  }

  readPlaceList(
    request: ReadPlaceListRequestDto,
  ): Promise<ReadPlaceListResponseDto> {
    return this.placeReadService.readPlaceList(request);
  }

  updatePlaceList(
    request: UpdatePlaceListRequestDto,
  ): Promise<UpdatePlaceListResponseDto> {
    return this.placeUpdateService.updatePlaceList(request);
  }

  deletePlaceList(
    request: DeletePlaceListRequestDto,
  ): Promise<DeletePlaceListResponseDto> {
    return this.placeDeleteService.deletePlaceList(request);
  }
}
