import { NestFactory } from '@nestjs/core';
import { ServerPlaceModule } from './server-place.module';
import { Cluster } from '@knighthell-boilerplate-nestjs/nestjs-cluster';

async function bootstrap() {
  const app = await NestFactory.create(ServerPlaceModule);
  await app.listen(3000);
}

if (process.env.CLUSTER_MODE === 'true') {
  Cluster.start(bootstrap);
} else {
  bootstrap();
}
