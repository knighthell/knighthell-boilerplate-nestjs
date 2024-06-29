import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import {
  ChatRoomReadListEventType,
  ChatRoomReadListServiceController,
  ReadListChatRoomRequest,
  ReadListChatRoomResponse,
} from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-read-list.service';
import { Server, Socket } from 'socket.io';
import { ChatRoomReadListService } from '../chat-room-read-list.service';

@WebSocketGateway({ namespace: 'chat', cors: true })
export class ChatRoomReadListWsGateway {
  logger = new Logger(ChatRoomReadListWsGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatRoomReadListService: ChatRoomReadListService,
  ) {}

  @SubscribeMessage(ChatRoomReadListEventType.READ_LIST_CHAT_ROOM)
  async readListChatRoom(
    @MessageBody() request: ReadListChatRoomRequest,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    this.logger.log({ request });

    const response = await this.chatRoomReadListService.readListChatRoom(
      request,
    );

    client.emit(ChatRoomReadListEventType.CHAT_ROOM_READ_LIST);
  }
}
