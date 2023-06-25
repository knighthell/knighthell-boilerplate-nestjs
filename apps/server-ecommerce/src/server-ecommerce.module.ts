import { Module } from '@nestjs/common';
import { ServerEcommerceController } from './server-ecommerce.controller';
import { ServerEcommerceService } from './server-ecommerce.service';

@Module({
  imports: [],
  controllers: [ServerEcommerceController],
  providers: [ServerEcommerceService],
})
export class ServerEcommerceModule {}
