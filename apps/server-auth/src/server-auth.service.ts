import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerAuthService {
  getHello(): string {
    return 'Hello World!';
  }
}
