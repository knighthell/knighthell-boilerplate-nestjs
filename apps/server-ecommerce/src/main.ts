import { NestFactory } from '@nestjs/core';
import { ServerEcommerceModule } from './server-ecommerce.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerEcommerceModule);
  await app.listen(3000);
}
bootstrap();
