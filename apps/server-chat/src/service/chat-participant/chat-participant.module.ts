import { Module } from '@nestjs/common';
import { ChatParticipantCreateModule } from './chat-participant-create/chat-participant-create.module';
import { ChatParticipantReadOneModule } from './chat-participant-read-one/chat-participant-read-one.module';
import { ChatParticipantReadListModule } from './chat-participant-read-list/chat-participant-read-list.module';
import { ChatParticipantUpdateModule } from './chat-participant-update/chat-participant-update.module';
import { ChatParticipantDeleteModule } from './chat-participant-delete/chat-participant-delete.module';

@Module({
  imports: [ChatParticipantCreateModule, ChatParticipantReadOneModule, ChatParticipantReadListModule, ChatParticipantUpdateModule, ChatParticipantDeleteModule]
})
export class ChatParticipantModule {}
