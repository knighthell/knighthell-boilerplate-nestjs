import { NestFactory } from '@nestjs/core';
import { ServerPlaceModule } from './server-place.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerPlaceModule);
  await app.listen(3000);
}
bootstrap();
