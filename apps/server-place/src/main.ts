import { NestFactory, Reflector } from '@nestjs/core';
import { ServerPlaceModule } from './server-place.module';
import { Cluster } from '@knighthell-boilerplate-nestjs/nestjs-cluster';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeJaegerOpenTelemetryNodeSDK } from '@knighthell-boilerplate-nestjs/opentelemetry';
import { Logger } from 'nestjs-pino';
import { initializeApp } from 'firebase-admin';
import { FirebaseAuthGuard } from '@knighthell-boilerplate-nestjs/common/guards';
import { PLACE_SERVICE_CREATE_PACKAGE_NAME } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-create.service';
import { PLACE_SERVICE_READ_PACKAGE_NAME } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-read.service';
import { PLACE_SERVICE_UPDATE_PACKAGE_NAME } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-update.service';
import { PLACE_SERVICE_DELETE_PACKAGE_NAME } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-delete.service';

async function bootstrap() {
  await initializeJaegerOpenTelemetryNodeSDK('server-place');

  /**
   * Firebase Admin Initialize on Google Cloud Platform
   * If you wanna run on the other clouds(AWS, Azure, etc..),
   * Please Check This URL:
   * https://firebase.google.com/docs/admin/setup?hl=ko#initialize_the_sdk_in_non-google_environments
   */
  const firebaseApp = initializeApp();

  const app = await NestFactory.create(ServerPlaceModule);

  app.getHttpAdapter().getInstance().set('etag', false);
  app.enableCors({
    origin: ['https://api.knighthell.dev', 'https://api.test.knighthell.dev'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  const serviceVersion = configService.get('service.version');
  const httpPort = configService.get('http.port');
  const grpcPort = configService.get('grpc.port');
  const natsHost = configService.get('nats.host');
  const natsPort = configService.get('nats.host');

  const grpcMicroservice = app.connectMicroservice<GrpcOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${grpcPort}`,
        package: [
          PLACE_SERVICE_CREATE_PACKAGE_NAME,
          PLACE_SERVICE_READ_PACKAGE_NAME,
          PLACE_SERVICE_UPDATE_PACKAGE_NAME,
          PLACE_SERVICE_DELETE_PACKAGE_NAME,
        ],
        protoPath: [
          resolve(
            'knighthell-boilerplate-idl-proto',
            'domain',
            'place',
            'place-create.service.proto',
          ),
          resolve(
            'knighthell-boilerplate-idl-proto',
            'domain',
            'place',
            'place-read.service.proto',
          ),
          resolve(
            'knighthell-boilerplate-idl-proto',
            'domain',
            'place',
            'place-update.service.proto',
          ),
          resolve(
            'knighthell-boilerplate-idl-proto',
            'domain',
            'place',
            'place-delete.service.proto',
          ),
        ],
        maxSendMessageLength: 1024 * 1024 * 10, // 10Mb, Client로 Response 가능한 payload 크기
        maxReceiveMessageLength: 1024 * 1024 * 10, // 10Mb, Client에서 보내는게 가능한 Request payload 크기
        loader: {
          keepCase: true,
        },
      },
    },
    { inheritAppConfig: true },
  );

  // const natsMicroservice = app.connectMicroservice<NatsOptions>(
  //   {
  //     transport: Transport.NATS,
  //     options: {
  //       servers: [`nats://${natsHost}:${natsPort}`],
  //     },
  //   },
  //   { inheritAppConfig: true },
  // );

  app.useLogger(app.get(Logger));

  app.useGlobalGuards(new FirebaseAuthGuard(app.get(Reflector)));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  /**
   * OpenAPI(Swagger) Document 설정
   */
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'Firebase Auth Token',
    )
    .setTitle('Knighthell Boilerplate Place API')
    .setDescription('Knighthell Boilerplate Place Service ')
    .setVersion(serviceVersion)
    .addTag('place')
    .build();
  const openApiDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, openApiDocument, {
    swaggerOptions: { displayRequestDuration: true },
  });

  await app.startAllMicroservices();
  await app.listen(httpPort, '0.0.0.0');
}

if (process.env.CLUSTER_MODE === 'true') {
  Cluster.start(bootstrap);
} else {
  bootstrap();
}
