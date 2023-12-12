import { NestFactory } from '@nestjs/core';
import { ServerPlaceModule } from './server-place.module';
import { Cluster } from '@knighthell-boilerplate-nestjs/nestjs-cluster';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, NatsOptions, Transport } from '@nestjs/microservices';
import { PLACE_PACKAGE_NAME } from '@knighthell-boilerplate-idl-proto/place/nestjs/place.service';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ServerPlaceModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: ['https://api.knighthell.dev', 'https://api.test.knighthell.dev'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  const httpPort = configService.get('http.port');
  const grpcPort = configService.get('grpc.port');
  const natsHost = configService.get('nats.host');
  const natsPort = configService.get('nats.host');

  const grpcMicroservice = app.connectMicroservice<GrpcOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${grpcPort}`,
        package: [PLACE_PACKAGE_NAME],
        protoPath: [
          join(
            __dirname +
              '../../../knighthell-boilerplate-idl-proto/place/' +
              'place.service.proto',
          ),
        ],
        maxSendMessageLength: 1024 * 1024 * 10, // 10Mb
        maxReceiveMessageLength: 1024 * 1024 * 10, // 10Mb
        // loader: {
        //   keepCase: true,
        //   enums: String,
        // },
      },
    },
    { inheritAppConfig: true },
  );

  const natsMicroservice = app.connectMicroservice<NatsOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: [`nats://${natsHost}:${natsPort}`],
      },
    },
    { inheritAppConfig: true },
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(httpPort, '0.0.0.0');
}

if (process.env.CLUSTER_MODE === 'true') {
  Cluster.start(bootstrap);
} else {
  bootstrap();
}
