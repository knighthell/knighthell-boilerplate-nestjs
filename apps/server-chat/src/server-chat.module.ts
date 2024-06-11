import { Module } from '@nestjs/common';
import { ChatRoomModule } from './service/chat-room/chat-room.module';
import { ChatParticipantModule } from './service/chat-participant/chat-participant.module';
import { ChatMessageModule } from './service/chat-message/chat-message.module';
import { ChatUserModule } from './service/chat-user/chat-user.module';
import { TypeOrmConfig } from './config/config-typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceConfig } from './config/config-service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    ChatRoomModule,
    ChatParticipantModule,
    ChatMessageModule,
    ChatUserModule,
  ],
  controllers: [],
  providers: [],
})
export class ServerChatModule {}
