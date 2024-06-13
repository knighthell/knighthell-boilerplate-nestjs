import { Module } from '@nestjs/common';
import { ChatRoomModule } from './service/chat-room/chat-room.module';
import { ChatParticipantModule } from './service/chat-participant/chat-participant.module';
import { ChatMessageModule } from './service/chat-message/chat-message.module';
import { ChatUserModule } from './service/chat-user/chat-user.module';
import { TypeOrmConfig } from './config/config-typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceConfig } from './config/config-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import process from 'process';
import { ChatRoomEntity } from './domain/chat-room/chat-room.entity';
import { ChatRoomStatisticsEntity } from './domain/chat-room-statistics/chat-room-statistics.entity';
import { ChatUserEntity } from './domain/chat-user/chat-user.entity';
import { ChatParticipantEntity } from './domain/chat-participant/chat-participant.entity';
import { ChatMessageEntity } from './domain/chat-message/chat-message.entity';
import { ChatMessageContentEntity } from './domain/chat-message/chat-message-content.entity';

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
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.PLACE_DB_POSTGRES_HOST || 'localhost',
    //   port: parseInt(process.env.PLACE_DB_POSTGRES_PORT, 10) || 5432,
    //   username: process.env.PLACE_DB_POSTGRES_USERNAME || 'chat',
    //   password: process.env.PLACE_DB_POSTGRES_PASSWORD || 'chat1234!!',
    //   database: process.env.PLACE_DB_POSTGRES_DATABASE_NAME || 'chat',
    //   entities: [
    //     ChatRoomEntity,
    //     ChatRoomStatisticsEntity,
    //     ChatUserEntity,
    //     ChatParticipantEntity,
    //     ChatMessageEntity,
    //     ChatMessageContentEntity,
    //   ],
    //   synchronize: true,
    // }),
    ChatRoomModule,
    ChatParticipantModule,
    ChatMessageModule,
    ChatUserModule,
  ],
  controllers: [],
  providers: [],
})
export class ServerChatModule {}
