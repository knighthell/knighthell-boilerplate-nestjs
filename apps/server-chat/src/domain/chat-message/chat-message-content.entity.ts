import { ChatMessageContent } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-message';
import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export class ChatMessageContentEntity implements ChatMessageContent {
  @PrimaryColumn('uuid', {
    default: () => 'uuid_generate_v7()',
    comment: '채팅 메세지 내용 고유 Id',
  })
  id: string;

  @Column({ type: 'varchar', length: 500 })
  text: string;
}
