import {
  Place,
  PlaceAddress,
  PlaceNameTranslation,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { PlaceUserEntity } from '../plalce-user/place-user.entity';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
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
import { Logger } from '@nestjs/common';

@Entity('Place')
export class PlaceEntity implements Place {
  private readonly logger = new Logger(PlaceEntity.name);

  @PrimaryColumn('uuid', {
    default: () => 'uuid_generate_v7()',
    comment: '장소 고유 Id',
  })
  placeId: string;

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

  distanceFromUser?: number | undefined;

  @AfterLoad()
  geomToLatLng() {
    this.logger.debug('Called geomToLatLng()');

    this.latitude = this.geom?.coordinates[1];
    this.longitude = this.geom?.coordinates[0];

    this.logger.debug({ latitude: this.latitude, longitude: this.longitude });
  }

  @BeforeInsert()
  latlngToGeomBeforeInsert() {
    this.logger.debug('Called latlngToGeomBeforeInsert()');

    if (this.latitude === undefined || this.longitude === undefined) {
      this.logger.error(
        `Latitude, Longitude 둘다 필요함(latitude: ${this.latitude}, longitude: ${this.longitude}`,
      );
    }

    this.geom = {
      type: 'Point',
      coordinates: [this.longitude, this.latitude], // !!!순서 주의!!!
    };
  }

  @BeforeUpdate()
  latlngToGeomBeforeUpdate() {
    this.logger.debug('Called latlngToGeomBeforeUpdate()');

    if (this.latitude === undefined || this.longitude === undefined) {
      this.logger.error(
        `Latitude, Longitude 둘다 필요함(latitude: ${this.latitude}, longitude: ${this.longitude}`,
      );
    }

    this.geom = {
      type: 'Point',
      coordinates: [this.longitude, this.latitude], // !!!순서 주의!!!
    };
  }
}
