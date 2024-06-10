import { Module } from '@nestjs/common';
import { ChatUserCreateModule } from './chat-user-create/chat-user-create.module';
import { ChatUserReadOneModule } from './chat-user-read-one/chat-user-read-one.module';
import { ChatUserReadListModule } from './chat-user-read-list/chat-user-read-list.module';
import { ChatUserUpdateModule } from './chat-user-update/chat-user-update.module';
import { ChatUserDeleteModule } from './chat-user-delete/chat-user-delete.module';

@Module({
  imports: [ChatUserCreateModule, ChatUserReadOneModule, ChatUserReadListModule, ChatUserUpdateModule, ChatUserDeleteModule]
})
export class ChatUserModule {}
