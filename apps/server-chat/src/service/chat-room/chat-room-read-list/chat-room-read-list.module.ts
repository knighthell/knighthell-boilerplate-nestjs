import { Module } from '@nestjs/common';
import { ChatRoomReadListService } from './chat-room-read-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomEntity } from '../../../domain/chat-room/chat-room.entity';
import { ChatRoomReadListWsGateway } from './ws/chat-room-read-list-ws.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity])],
  providers: [ChatRoomReadListService, ChatRoomReadListWsGateway],
})
export class ChatRoomReadListModule {}
