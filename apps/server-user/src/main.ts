import { NestFactory } from '@nestjs/core';
import { ServerUserModule } from './server-user.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerUserModule);
  await app.listen(3000);
}
bootstrap();
