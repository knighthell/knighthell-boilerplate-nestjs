import { NestFactory } from '@nestjs/core';
import { ServerUserModule } from './server-user.module';
import { initializeJaegerOpenTelemetryNodeSDK } from '@knighthell-boilerplate-nestjs/opentelemetry';
import { initializeApp } from 'firebase-admin';
import {
  getPackageNames,
  getProtoPaths,
} from '@knighthell-boilerplate-nestjs/common/grpc/proto-path';
import { resolve } from 'path';

async function bootstrap() {
  await initializeJaegerOpenTelemetryNodeSDK('server-user');

  // const firebaseApp = initializeApp();

  const app = await NestFactory.create(ServerUserModule);

  app.getHttpAdapter().getInstance().set('etag', false);
  app.enableCors({
    origin: ['https://api.knighthell.dev', 'https://api.test.knighthell.dev'],
  });

  const protoPaths = await getProtoPaths(
    resolve('knighthell-boilerplate-idl-proto', 'domain', 'place'),
  );

  const protoPackageNames = await getPackageNames(
    resolve('knighthell-boilerplate-idl-proto'),
    'place',
  );

  console.log(JSON.stringify({ protoPaths, protoPackageNames }, null, 2));

  await app.listen(3000);
}
bootstrap();
