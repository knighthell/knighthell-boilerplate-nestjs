import { ChatParticipant } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-participant';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatMessageEntity } from '../chat-message/chat-message.entity';
import { ChatUserEntity } from '../chat-user/chat-user.entity';
import { ChatRoomEntity } from '../chat-room/chat-room.entity';

@Entity('ChatParticipant')
export class ChatParticipantEntity implements ChatParticipant {
  @PrimaryColumn('uuid', {
    comment: '참가자 고유 Id',
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
