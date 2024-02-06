import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { PlaceEntity } from '../../../domain/place/place.entity';
import { PlaceUpdateServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-update.service';
import { UpdatePlaceListRequestDto } from '../../../port-in/dto/place/update-place-list/update-place-list-request.dto';
import { UpdatePlaceListResponseDto } from '../../../port-in/dto/place/update-place-list/update-place-list-response.dto';
import { plainToInstance } from 'class-transformer';
import { checkNotExistIdsFromEntitiesOrFail } from '@knighthell-boilerplate-nestjs/common/utils';

@Injectable()
export class PlaceUpdateService implements PlaceUpdateServiceController {
  private readonly logger = new Logger(PlaceUpdateService.name);

  constructor(private readonly placeRepository: Repository<PlaceEntity>) {}

  async updatePlaceList(
    request: UpdatePlaceListRequestDto,
  ): Promise<UpdatePlaceListResponseDto> {
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

    const mergedPlaceEntities = existPlaceEntities.map((eixstPlace) =>
      this.placeRepository.merge(eixstPlace, {
        ...request.places.find(
          (requestPlace) => requestPlace.placeId === eixstPlace.placeId,
        ),
      }),
    );

    const savedPlaceEntities = await this.placeRepository.save(
      mergedPlaceEntities,
    );

    return plainToInstance(UpdatePlaceListResponseDto, {
      results: savedPlaceEntities,
    } as UpdatePlaceListResponseDto);
  }
}
