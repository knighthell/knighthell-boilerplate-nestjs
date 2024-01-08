import { Module } from '@nestjs/common';
import { PlaceServiceModule } from './service/place/place-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceConfig from './config/config-service';
import typeormConfig from './config/config-typeorm';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from '@knighthell-boilerplate-nestjs/pino-logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [serviceConfig, typeormConfig],
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
})
export class ServerPlaceModule {}
