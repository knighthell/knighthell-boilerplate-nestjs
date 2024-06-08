import { ChatUser } from '@knighthell-boilerplate-idl-proto/chat/nestjs/chat-user';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ChatParticipantEntity } from '../chat-participant/chat-participant.entity';

@Entity('ChatUser')
export class ChatUserEntity implements ChatUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  displayName: string;

  @Column({ type: 'varchar', length: 255 })
  photoUrl: string;

  @OneToMany(() => ChatParticipantEntity, (participant) => participant.user)
  participants: ChatParticipantEntity[];
}
