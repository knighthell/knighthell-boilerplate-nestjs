import {
  Place,
  PlaceAddress,
  PlaceNameTranslation,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { PlaceUserEntity } from '../plalce-user/place-user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToOne,
  Point,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('place')
export class PlaceEntity extends BaseEntity implements Place {
  @PrimaryColumn('uuid', {
    default: () => 'uuid_generate_v7()',
    comment: '장소 고유 Id',
  })
  id: string;

  latitude: number;

  longitude: number;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
    comment: '장소의 위치정보를 spacial data column type으로 저장된 데이터',
  })
  @Index({ spatial: true })
  geom: Point;

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

  @Column('varchar', { length: 1000, comment: '장소 이름' })
  name: string;

  @Column('jsonb', { nullable: true, comment: '장소 이름에 대한 다국어 정보' })
  nameTranslation?: PlaceNameTranslation | undefined;

  @Column('jsonb', {
    nullable: true,
    comment: '장소가 포함된 나라의 주소 정보',
  })
  address?: PlaceAddress | undefined;
}
