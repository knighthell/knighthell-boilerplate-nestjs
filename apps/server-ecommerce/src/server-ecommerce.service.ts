import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerEcommerceService {
  getHello(): string {
    return 'Hello World!';
  }
}
