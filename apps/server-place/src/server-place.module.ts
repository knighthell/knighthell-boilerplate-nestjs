import { Module } from '@nestjs/common';
import { ServerPlaceController } from './server-place.controller';
import { ServerPlaceService } from './server-place.service';

@Module({
  imports: [],
  controllers: [ServerPlaceController],
  providers: [ServerPlaceService],
})
export class ServerPlaceModule {}
