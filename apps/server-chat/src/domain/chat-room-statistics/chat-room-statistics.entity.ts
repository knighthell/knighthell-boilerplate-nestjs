import { ChatRoomStatistics } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-statistics';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ChatRoomEntity } from '../chat-room/chat-room.entity';

@Entity('ChatRoomStatistics')
export class ChatRoomStatisticsEntity implements ChatRoomStatistics {
  @PrimaryColumn('uuid', {
    comment: '채팅방 통계 고유 Id',
  })
  id: string;

  @Column({ type: 'integer', unsigned: true, default: 0 })
  participantCount: number;

  @OneToOne(() => ChatRoomEntity, (room) => room.statistics)
  @JoinColumn()
  room?: ChatRoomEntity;
}
