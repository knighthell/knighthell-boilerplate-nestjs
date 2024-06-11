import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { CreateChatRoomRequestDto } from '../dto/create-chat-room-request.dto';
import { ChatRoomCreateService } from '../chat-room-create.service';
import { ChatRoomCreateEventType } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-create.service';

@WebSocketGateway({ namespace: 'chat', cors: true })
export class ChatRoomCreateWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  logger = new Logger(ChatRoomCreateWsGateway.name);

  constructor(private readonly chatRoomCreateService: ChatRoomCreateService) {}

  async handleConnection(client: Socket): Promise<void> {
    this.logger.debug('ChatRoom handleConnection');
  }

  async handleDisconnect(client: Socket): Promise<any> {
    this.logger.debug('ChatRoom handleDisconnect');
  }

  @SubscribeMessage(ChatRoomCreateEventType.CREATE_CHAT_ROOM)
  async onReadChatRoomList(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: CreateChatRoomRequestDto,
  ): Promise<void> {
    const user = client.data.user;
    this.logger.log({ request, user });

    const createChatRoomResponse =
      await this.chatRoomCreateService.createChatRoom(request);
    this.logger.log({ createChatRoomResponse });

    client.emit(
      ChatRoomCreateEventType.CHAT_ROOM_CREATED,
      createChatRoomResponse,
    );
  }
}
