import { Module } from '@nestjs/common';
import { ServerChatController } from './server-chat.controller';
import { ServerChatService } from './server-chat.service';

@Module({
  imports: [],
  controllers: [ServerChatController],
  providers: [ServerChatService],
})
export class ServerChatModule {}
