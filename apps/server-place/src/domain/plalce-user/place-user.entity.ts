import { PlaceUser } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-user';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('PlaceUser')
export class PlaceUserEntity implements PlaceUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  displayName: string;

  @CreateDateColumn()
  createdDateTimeUTC: Date | undefined;

  @Column('varchar', { length: 2048, nullable: true })
  photoUrl?: string | undefined;
}
