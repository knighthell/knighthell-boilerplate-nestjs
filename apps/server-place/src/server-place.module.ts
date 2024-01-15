import { Module } from '@nestjs/common';
import { PlaceServiceModule } from './service/place/place-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceConfig } from './config/config-service';
import { TypeOrmConfig } from './config/config-typeorm';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from '@knighthell-boilerplate-nestjs/pino-logger';
import { PlaceHttpController } from './port-in/http/place/place-http.controller';
import { PlaceGrpcController } from './port-in/grpc/place/place-grpc.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [ServiceConfig, TypeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot(pinoLoggerConfig),
    PlaceServiceModule,
  ],
  controllers: [PlaceHttpController, PlaceGrpcController],
})
export class ServerPlaceModule {}
