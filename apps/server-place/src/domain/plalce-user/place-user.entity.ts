import { PlaceUser } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-user';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('place-user')
export class PlaceUserEntity implements PlaceUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 2048 })
  photoURL: string;

  @Column('varchar', { length: 255 })
  displayName: string;
}
