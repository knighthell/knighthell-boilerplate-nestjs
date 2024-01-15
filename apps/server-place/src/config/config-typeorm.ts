import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import process from 'process';
import { PlaceEntity } from '../domain/place/place.entity';
import { PlaceUserEntity } from '../domain/plalce-user/place-user.entity';
import { resolve } from 'path';

configDotenv();

const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PLACE_DB_POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.PLACE_DB_POSTGRES_PORT, 10) || 5433,
  username: process.env.PLACE_DB_POSTGRES_USERNAME || 'place',
  password: process.env.PLACE_DB_POSTGRES_PASSWORD || 'place1234!!',
  database: process.env.PLACE_DB_POSTGRES_DATABASE_NAME || 'place',
  entities: [PlaceEntity, PlaceUserEntity],
  synchronize: false,
};

const migrationConfig: DataSourceOptions = {
  ...typeormConfig,
  migrations: [resolve('apps', 'server-place', 'migration', '*{.ts,.js}')],
};

export const TypeOrmConfig = registerAs('typeorm', () => typeormConfig);

export default new DataSource(migrationConfig);
