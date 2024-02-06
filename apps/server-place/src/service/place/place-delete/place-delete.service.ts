import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PlaceDeleteServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-delete.service';
import { In, Repository } from 'typeorm';
import { PlaceEntity } from '../../../domain/place/place.entity';
import { DeletePlaceListRequestDto } from '../../../port-in/dto/place/delete-place-list/delete-place-list-request.dto';
import { DeletePlaceListResponseDto } from '../../../port-in/dto/place/delete-place-list/delete-place-list-response.dto';
import { plainToInstance } from 'class-transformer';
import { checkNotExistIdsFromEntitiesOrFail } from '@knighthell-boilerplate-nestjs/common/utils';

@Injectable()
export class PlaceDeleteService implements PlaceDeleteServiceController {
  private readonly logger = new Logger(PlaceDeleteService.name);

  constructor(private readonly placeRepository: Repository<PlaceEntity>) {}

  async deletePlaceList(
    request: DeletePlaceListRequestDto,
  ): Promise<DeletePlaceListResponseDto> {
    const requestPlaceIds = request.places.map((place) => place.placeId);

    const existPlaceEntities = await this.placeRepository.find({
      where: { placeId: In(requestPlaceIds) },
    });

    checkNotExistIdsFromEntitiesOrFail(
      requestPlaceIds,
      existPlaceEntities,
      'placeId',
      (notExistIds) => {
        throw new HttpException(
          `NOT EXIST Places(ids: ${notExistIds})`,
          HttpStatus.NO_CONTENT,
        );
      },
    );

    const removedPlaceEntities = await this.placeRepository.softRemove(
      existPlaceEntities,
    );

    return plainToInstance(DeletePlaceListResponseDto, {
      results: removedPlaceEntities,
    } as DeletePlaceListResponseDto);
  }
}
