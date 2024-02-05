import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from '../../domain/place/place.entity';
import { PlaceCreateService } from './place-create/place-create.service';
import { PlaceReadService } from './place-read/place-read.service';
import { PlaceUpdateService } from './place-update/place-update.service';
import { PlaceDeleteService } from './place-delete/place-delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity])],
  providers: [
    PlaceCreateService,
    PlaceReadService,
    PlaceUpdateService,
    PlaceDeleteService,
  ],
  exports: [
    PlaceCreateService,
    PlaceReadService,
    PlaceUpdateService,
    PlaceDeleteService,
  ],
})
export class PlaceServiceModule {}
