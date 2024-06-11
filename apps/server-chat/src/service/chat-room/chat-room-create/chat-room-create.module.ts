import { Module } from '@nestjs/common';
import { ChatRoomCreateService } from './chat-room-create.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomEntity } from '../../../domain/chat-room/chat-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity])],
  providers: [ChatRoomCreateService],
})
export class ChatRoomCreateModule {}
