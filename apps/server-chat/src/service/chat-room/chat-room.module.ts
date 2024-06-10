import { Module } from '@nestjs/common';
import { ChatRoomCreateModule } from './chat-room-create/chat-room-create.module';
import { ChatRoomReadOneModule } from './chat-room-read-one/chat-room-read-one.module';
import { ChatRoomReadListModule } from './chat-room-read-list/chat-room-read-list.module';
import { ChatRoomUpdateModule } from './chat-room-update/chat-room-update.module';
import { ChatRoomDeleteModule } from './chat-room-delete/chat-room-delete.module';

@Module({
  imports: [ChatRoomCreateModule, ChatRoomReadOneModule, ChatRoomReadListModule, ChatRoomUpdateModule, ChatRoomDeleteModule]
})
export class ChatRoomModule {}
