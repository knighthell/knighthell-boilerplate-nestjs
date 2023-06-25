import { Controller, Get } from '@nestjs/common';
import { ServerPlaceService } from './server-place.service';

@Controller()
export class ServerPlaceController {
  constructor(private readonly serverPlaceService: ServerPlaceService) {}

  @Get()
  getHello(): string {
    return this.serverPlaceService.getHello();
  }
}
