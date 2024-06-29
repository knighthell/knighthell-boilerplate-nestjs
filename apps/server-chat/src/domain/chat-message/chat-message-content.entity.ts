import { ChatMessageContent } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-message';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ChatMessageContent')
export class ChatMessageContentEntity implements ChatMessageContent {
  @PrimaryColumn('uuid', {
    comment: '채팅 메세지 내용 고유 Id',
  })
  id: string;

  @Column({ type: 'varchar', length: 500 })
  text: string;
}
