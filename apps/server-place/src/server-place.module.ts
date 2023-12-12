import { Module } from '@nestjs/common';
import { PlaceServiceModule } from './service/place/place-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceConfig from './config/config-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serviceConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PLACE_DB_POSTGRES_HOST'),
        port: configService.get<number>('PLACE_DB_POSTGRES_PORT'),
        username: configService.get('PLACE_DB_POSTGRES_USERNAME'),
        password: configService.get('PLACE_DB_POSTGRES_PASSWORD'),
        database: configService.get('PLACE_DB_POSTGRES_DATABASE'),
        entities: [],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    PlaceServiceModule,
  ],
})
export class ServerPlaceModule {}
