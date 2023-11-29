import { Module } from '@nestjs/common';
import { PlaceModule } from './service/place/place.module';

@Module({
  imports: [PlaceModule],
})
export class ServerPlaceModule {}
