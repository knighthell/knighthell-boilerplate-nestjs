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
  JoinColumn,
  Entity,
} from 'typeorm';
import { ChatUserEntity } from '../chat-user/chat-user.entity';
import { ChatParticipantEntity } from '../chat-participant/chat-participant.entity';

@Entity('ChatMessage')
export class ChatMessageEntity implements ChatMessage {
  @PrimaryColumn('uuid', {
    comment: '채팅 메세지 고유 Id',
  })
  id: string;

  @ManyToOne(() => ChatUserEntity)
  @JoinColumn()
  createdBy: ChatUserEntity | undefined;
  @CreateDateColumn()
  createdDateTimeUTC: Date | undefined;

  @ManyToOne(() => ChatUserEntity)
  @JoinColumn()
  updatedBy?: ChatUserEntity | undefined;
  @UpdateDateColumn()
  updatedDateTimeUTC?: Date | undefined;

  @ManyToOne(() => ChatUserEntity)
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
