import { NestFactory } from '@nestjs/core';
import { ServerChatModule } from './server-chat.module';
import { RedisIoAdapter } from './service/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(ServerChatModule);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3000);
}
bootstrap();
