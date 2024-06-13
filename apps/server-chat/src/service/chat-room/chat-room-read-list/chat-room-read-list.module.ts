import { Module } from '@nestjs/common';
import { ChatRoomReadListService } from './chat-room-read-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomEntity } from '../../../domain/chat-room/chat-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity])],
  providers: [ChatRoomReadListService],
})
export class ChatRoomReadListModule {}
