import { ChatParticipant } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-participant';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatUser } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-user';
import { ChatRoom } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room';
import { ChatMessageEntity } from '../chat-message/chat-message.entity';
import { ChatUserEntity } from '../chat-user/chat-user.entity';
import { ChatRoomEntity } from '../chat-room/chat-room.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity('ChatParticipant')
export class ChatParticipantEntity implements ChatParticipant {
  @PrimaryColumn('uuid', {
    default: () => 'uuid_generate_v7()',
    comment: '참가자 고유 Id',
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

  @ManyToOne(() => ChatRoomEntity, (room) => room.participants, {
    cascade: ['insert', 'recover', 'soft-remove'],
  })
  @JoinColumn()
  room: ChatRoomEntity | undefined;

  @ManyToOne(() => ChatUserEntity, (user) => user.participants)
  @JoinColumn()
  user: ChatUserEntity | undefined;

  @Column({ type: 'varchar', length: 255 })
  participantName?: string | undefined;

  @Column({ type: 'varchar', length: 255 })
  participantPhotoUrl?: string | undefined;

  @OneToMany(() => ChatMessageEntity, (message) => message.participant)
  messages: ChatMessageEntity[];
}