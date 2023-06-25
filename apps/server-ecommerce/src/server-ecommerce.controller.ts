import { Controller, Get } from '@nestjs/common';
import { ServerEcommerceService } from './server-ecommerce.service';

@Controller()
export class ServerEcommerceController {
  constructor(private readonly serverEcommerceService: ServerEcommerceService) {}

  @Get()
  getHello(): string {
    return this.serverEcommerceService.getHello();
  }
}
