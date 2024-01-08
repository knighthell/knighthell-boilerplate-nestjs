import { NestFactory } from '@nestjs/core';
import { ServerPlaceModule } from './server-place.module';
import { Cluster } from '@knighthell-boilerplate-nestjs/nestjs-cluster';
import { ConfigService } from '@nestjs/config';
import {
  GrpcOptions,
  KafkaOptions,
  NatsOptions,
  Transport,
} from '@nestjs/microservices';
import { PLACE_PACKAGE_NAME } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeJaegerOpenTelemetryNodeSDK } from '@knighthell-boilerplate-nestjs/opentelemetry';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  await initializeJaegerOpenTelemetryNodeSDK('server-place');

  const app = await NestFactory.create<NestFastifyApplication>(
    ServerPlaceModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: ['https://api.knighthell.dev', 'https://api.test.knighthell.dev'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  const serviceVersion = configService.get('service.version');
  const httpPort = configService.get('http.port');
  const grpcPort = configService.get('grpc.port');
  const natsHost = configService.get('nats.host');
  const natsPort = configService.get('nats.host');

  // const grpcMicroservice = app.connectMicroservice<GrpcOptions>(
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       url: `0.0.0.0:${grpcPort}`,
  //       package: [PLACE_PACKAGE_NAME],
  //       protoPath: [
  //         join(
  //           __dirname,
  //           '..',
  //           '..',
  //           'knighthell-boilerplate-idl-proto',
  //           'place',
  //           'place.service.proto',
  //         ),
  //       ],
  //       maxSendMessageLength: 1024 * 1024 * 10, // 10Mb, Client로 Response 가능한 payload 크기
  //       maxReceiveMessageLength: 1024 * 1024 * 10, // 10Mb, Client에서 보내는게 가능한 Request payload 크기
  //       // loader: {
  //       //   keepCase: true,
  //       //   enums: String,
  //       // },
  //     },
  //   },
  //   { inheritAppConfig: true },
  // );

  // const natsMicroservice = app.connectMicroservice<NatsOptions>(
  //   {
  //     transport: Transport.NATS,
  //     options: {
  //       servers: [`nats://${natsHost}:${natsPort}`],
  //     },
  //   },
  //   { inheritAppConfig: true },
  // );

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(Logger));

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
