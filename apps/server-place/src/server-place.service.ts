import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerPlaceService {
  getHello(): string {
    return 'Hello World!';
  }
}
