import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from '../../domain/place/place.entity';
import { PlaceCreateService } from './place-create/place-create.service';
import { PlaceReadService } from './place-read/place-read.service';
import { PlaceUpdateService } from './place-update/place-update.service';
import { PlaceDeleteService } from './place-delete/place-delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity])],
  providers: [
    PlaceService,
    PlaceCreateService,
    PlaceReadService,
    PlaceUpdateService,
    PlaceDeleteService,
  ],
  exports: [
    PlaceService,
    PlaceCreateService,
    PlaceReadService,
    PlaceUpdateService,
    PlaceDeleteService,
  ],
})
export class PlaceServiceModule {}
