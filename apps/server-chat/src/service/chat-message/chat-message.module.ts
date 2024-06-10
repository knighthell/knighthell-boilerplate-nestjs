import { Module } from '@nestjs/common';
import { ChatMessageCreateModule } from './chat-message-create/chat-message-create.module';
import { ChatMessageReadOneModule } from './chat-message-read-one/chat-message-read-one.module';
import { ChatMessageReadListModule } from './chat-message-read-list/chat-message-read-list.module';
import { ChatMessageUpdateModule } from './chat-message-update/chat-message-update.module';
import { ChatMessageDeleteModule } from './chat-message-delete/chat-message-delete.module';

@Module({
  imports: [ChatMessageCreateModule, ChatMessageReadOneModule, ChatMessageReadListModule, ChatMessageUpdateModule, ChatMessageDeleteModule]
})
export class ChatMessageModule {}
