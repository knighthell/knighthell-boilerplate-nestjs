import {
  ChatMessage,
  ChatMessageType,
} from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-message';
import { ChatMessageContentEntity } from './chat-message-content.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatUserEntity } from '../chat-user/chat-user.entity';
import { ChatParticipantEntity } from '../chat-participant/chat-participant.entity';
import { JoinColumn } from 'typeorm/browser';

export class ChatMessageEntity implements ChatMessage {
  @PrimaryColumn('uuid', {
    default: () => 'uuid_generate_v7()',
    comment: '채팅 메세지 고유 Id',
  })
  id: string;

  @OneToOne(() => ChatUserEntity)
  @JoinColumn()
  createdBy: ChatUserEntity | undefined;
  @CreateDateColumn()
  createdDateTimeUTC: Date | undefined;

  @OneToOne(() => ChatUserEntity)
  @JoinColumn()
  updatedBy?: ChatUserEntity | undefined;
  @UpdateDateColumn()
  updatedDateTimeUTC?: Date | undefined;

  @OneToOne(() => ChatUserEntity)
  @JoinColumn()
  deletedBy?: ChatUserEntity | undefined;
  @DeleteDateColumn()
  deletedDateTimeUTC?: Date | undefined;

  @ManyToOne(() => ChatParticipantEntity, (participant) => participant.messages)
  participant: ChatParticipantEntity | undefined;

  @Column({
    type: 'enum',
    enum: ChatMessageType,
    default: ChatMessageType.TEXT,
  })
  type: ChatMessageType;

  @OneToOne(() => ChatMessageEntity)
  content: ChatMessageContentEntity | undefined;
}
