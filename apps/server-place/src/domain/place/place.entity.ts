import { Place } from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { PlaceAddressEntity } from '../place-address/place-address.entity';
import { PlaceUserEntity } from '../place-user/place-user.entity';
import { PlaceLocationEntity } from '../place-location/place-location.entity';
import { PlaceParkingLotEntity } from '../place-parking-lot/place-parking-lot.entity';

export class PlaceEntity implements Place {
  id: string;
  createdAt: Date;
  createdBy: PlaceUserEntity;
  updatedAt: Date;
  updatedBy: PlaceUserEntity;
  deletedAt?: Date | undefined;
  deletedBy?: PlaceUserEntity | undefined;

  name: string;

  location: PlaceLocationEntity;

  address?: PlaceAddressEntity | undefined;

  parkingLot?: PlaceParkingLotEntity | undefined;
}
