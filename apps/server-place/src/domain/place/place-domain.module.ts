import { Module } from '@nestjs/common';
import { PlaceRepository } from './place.repository';

@Module({
  imports: [],
  providers: [PlaceRepository],
})
export class PlaceDomainModule {}
