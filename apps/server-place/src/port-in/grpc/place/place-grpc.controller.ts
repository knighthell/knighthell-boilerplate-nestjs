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

@Controller()
@PlaceServiceControllerMethods()
export class PlaceGrpcController implements PlaceServiceController {
  private readonly logger = new Logger(PlaceGrpcController.name);

  constructor(private readonly placeService: PlaceService) {}

  createPlaceList(
    request: CreatePlaceListRequestDto,
  ): Promise<CreatePlaceListResponseDto> {
    return this.placeService.createPlaceList(request);
  }

  deletePlaceList(
    request: DeletePlaceListRequestDto,
  ): Promise<DeletePlaceListResponseDto> {
    return this.placeService.deletePlaceList(request);
  }

  readPlaceList(
    request: ReadPlaceListRequestDto,
  ): Promise<ReadPlaceListResponseDto> {
    return this.placeService.readPlaceList(request);
  }

  updatePlaceList(
    request: UpdatePlaceListRequestDto,
  ): Promise<UpdatePlaceListResponseDto> {
    return this.placeService.updatePlaceList(request);
  }
}
