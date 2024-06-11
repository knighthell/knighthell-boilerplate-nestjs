import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import process from 'process';
import { resolve } from 'path';
import { ChatRoomEntity } from '../domain/chat-room/chat-room.entity';
import { ChatRoomStatisticsEntity } from '../domain/chat-room-statistics/chat-room-statistics.entity';
import { ChatUserEntity } from '../domain/chat-user/chat-user.entity';
import { ChatParticipantEntity } from '../domain/chat-participant/chat-participant.entity';
import { ChatMessageEntity } from '../domain/chat-message/chat-message.entity';
import { ChatMessageContentEntity } from '../domain/chat-message/chat-message-content.entity';

// if (
//   process.env.NODE_ENV &&
//   ['local', 'dev', 'staging'].includes(process.env.NODE_ENV)
// ) {
//   configDotenv({ path: `./.env.${process.env.NODE_ENV}` });
// }
configDotenv({ path: './.env.local' });

const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PLACE_DB_POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.PLACE_DB_POSTGRES_PORT, 10) || 11101,
  username: process.env.PLACE_DB_POSTGRES_USERNAME || 'chat',
  password: process.env.PLACE_DB_POSTGRES_PASSWORD || 'chat1234!!',
  database: process.env.PLACE_DB_POSTGRES_DATABASE_NAME || 'chat',
  entities: [
    ChatRoomEntity,
    ChatRoomStatisticsEntity,
    ChatUserEntity,
    ChatParticipantEntity,
    ChatMessageEntity,
    ChatMessageContentEntity,
  ],
  synchronize: false,
};

const migrationConfig: DataSourceOptions = {
  ...typeormConfig,
  migrations: [resolve('apps', 'server-chat', 'migration', '*{.ts,.js}')],
};

export const TypeOrmConfig = registerAs('typeorm', () => typeormConfig);

export default new DataSource(migrationConfig);
