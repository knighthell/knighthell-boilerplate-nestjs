import { NestFactory } from '@nestjs/core';
import { ServerChatModule } from './server-chat.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerChatModule);
  await app.listen(3000);
}
bootstrap();
