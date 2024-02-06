import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PlaceDeleteServiceController } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-delete.service';
import { In, Repository } from 'typeorm';
import { PlaceEntity } from '../../../domain/place/place.entity';
import { DeletePlaceListRequestDto } from '../../../port-in/dto/place/delete-place-list/delete-place-list-request.dto';
import { DeletePlaceListResponseDto } from '../../../port-in/dto/place/delete-place-list/delete-place-list-response.dto';
import { plainToInstance } from 'class-transformer';

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

    if (request.places.length !== existPlaceEntities.length) {
      const existPlaceEntityIds = existPlaceEntities.map(
        (place) => place.placeId,
      );
      const differenceIds = new Set(
        requestPlaceIds.filter((x) => !new Set(existPlaceEntityIds).has(x)),
      );
      throw new HttpException(
        `NOT EXIST Places(ids: ${differenceIds})`,
        HttpStatus.NO_CONTENT,
      );
    }

    const removedPlaceEntities = await this.placeRepository.softRemove(
      existPlaceEntities,
    );

    return plainToInstance(DeletePlaceListResponseDto, {
      results: removedPlaceEntities,
    } as DeletePlaceListResponseDto);
  }
}
