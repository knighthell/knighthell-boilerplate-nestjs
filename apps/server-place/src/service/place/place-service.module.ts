import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from '../../domain/place/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity])],
  // providers: [PlaceService],
})
export class PlaceServiceModule {}
