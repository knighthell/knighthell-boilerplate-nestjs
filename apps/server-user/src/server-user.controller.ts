import { Controller, Get } from '@nestjs/common';
import { ServerUserService } from './server-user.service';

@Controller()
export class ServerUserController {
  constructor(private readonly serverUserService: ServerUserService) {}

  @Get()
  getHello(): string {
    return this.serverUserService.getHello();
  }
}
