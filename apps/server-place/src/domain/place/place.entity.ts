import {
  Place,
  PlaceAddress,
  PlaceNameTranslation,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { PlaceUserEntity } from '../plalce-user/place-user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('place')
export class PlaceEntity implements Place {
  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v7()' })
  id: string;

  latitude: number;

  longitude: number;

  @OneToOne(() => PlaceUserEntity)
  createdBy: PlaceUserEntity | undefined;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @OneToOne(() => PlaceUserEntity)
  updatedBy: PlaceUserEntity | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;

  @OneToOne(() => PlaceUserEntity)
  deletedBy: PlaceUserEntity | undefined;

  @DeleteDateColumn()
  deletedAt: Date | undefined;

  @Column('varchar', { length: 1000 })
  name: string;

  @Column('jsonb', { nullable: true })
  nameTranslation?: PlaceNameTranslation | undefined;

  @Column('jsonb', { nullable: true })
  address?: PlaceAddress | undefined;
}
