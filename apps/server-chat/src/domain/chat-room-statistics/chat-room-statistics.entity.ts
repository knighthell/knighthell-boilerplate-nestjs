import { ChatRoomStatistics } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-room-statistics';
import { Column, OneToOne, PrimaryColumn } from 'typeorm';
import { ChatRoomEntity } from '../chat-room/chat-room.entity';
import { JoinColumn } from 'typeorm/browser';

export class ChatRoomStatisticsEntity implements ChatRoomStatistics {
  @PrimaryColumn('uuid', {
    default: () => 'uuid_generate_v7()',
    comment: '채팅방 통계 고유 Id',
  })
  id: string;

  @Column({ type: 'integer', unsigned: true, default: 0 })
  participantCount: number;

  @OneToOne(() => ChatRoomEntity, (room) => room.statistics)
  @JoinColumn()
  room?: ChatRoomEntity;
}
