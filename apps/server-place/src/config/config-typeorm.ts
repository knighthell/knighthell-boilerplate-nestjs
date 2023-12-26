import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import process from 'process';
import { PlaceEntity } from '../domain/place/place.entity';
import { PlaceUserEntity } from '../domain/plalce-user/place-user.entity';
import { resolve, relative } from 'path';

console.log(resolve('migrations', '*{.ts,.js}'));
configDotenv();

const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PLACE_DB_POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.PLACE_DB_POSTGRES_PORT, 10) || 5433,
  username: process.env.PLACE_DB_POSTGRES_USERNAME || 'place',
  password: process.env.PLACE_DB_POSTGRES_PASSWORD || 'place1234!!',
  database: process.env.PLACE_DB_POSTGRES_DATABASE_NAME || 'place',
  entities: [PlaceEntity, PlaceUserEntity],
  // migrations: [resolve('migrations', '*{.ts,.js}')],
  synchronize: false,
};

export default registerAs('typeorm', () => typeormConfig);
export const connectionSourcePlacePostgres = new DataSource(typeormConfig);
