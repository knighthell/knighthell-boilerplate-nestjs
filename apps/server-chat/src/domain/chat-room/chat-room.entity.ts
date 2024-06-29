import { ChatRoom } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ChatUserEntity } from '../chat-user/chat-user.entity';
import { ChatParticipantEntity } from '../chat-participant/chat-participant.entity';
import { ChatRoomStatisticsEntity } from '../chat-room-statistics/chat-room-statistics.entity';

@Entity('ChatRoom')
export class ChatRoomEntity implements ChatRoom {
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

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToOne(() => ChatRoomStatisticsEntity, (statistics) => statistics.room, {
    cascade: true,
  })
  statistics: ChatRoomStatisticsEntity;

  @OneToMany(() => ChatParticipantEntity, (participant) => participant.room)
  participants?: ChatParticipantEntity[];
}
