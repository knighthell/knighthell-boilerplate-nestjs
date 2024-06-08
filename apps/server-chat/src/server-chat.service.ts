import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerChatService {
  getHello(): string {
    return 'Hello World!';
  }
}
