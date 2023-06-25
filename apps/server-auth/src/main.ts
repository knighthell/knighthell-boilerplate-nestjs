import { NestFactory } from '@nestjs/core';
import { ServerAuthModule } from './server-auth.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerAuthModule);
  await app.listen(3000);
}
bootstrap();
