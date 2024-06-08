import { Controller, Get } from '@nestjs/common';
import { ServerChatService } from './server-chat.service';

@Controller()
export class ServerChatController {
  constructor(private readonly serverChatService: ServerChatService) {}

  @Get()
  getHello(): string {
    return this.serverChatService.getHello();
  }
}
