import { Controller, Get } from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';

@Controller()
export class ServerAuthController {
  constructor(private readonly serverAuthService: ServerAuthService) {}

  @Get()
  getHello(): string {
    return this.serverAuthService.getHello();
  }
}
