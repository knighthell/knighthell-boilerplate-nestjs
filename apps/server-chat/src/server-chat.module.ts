import { Module } from '@nestjs/common';
import { ChatRoomModule } from './service/chat-room/chat-room.module';
import { ChatParticipantModule } from './service/chat-participant/chat-participant.module';
import { ChatMessageModule } from './service/chat-message/chat-message.module';
import { ChatUserModule } from './service/chat-user/chat-user.module';

@Module({
  imports: [ChatRoomModule, ChatParticipantModule, ChatMessageModule, ChatUserModule],
  controllers: [],
  providers: [],
})
export class ServerChatModule {}
