import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerUserService {
  getHello(): string {
    return 'Hello World!';
  }
}
