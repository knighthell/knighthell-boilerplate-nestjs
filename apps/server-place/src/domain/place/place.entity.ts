import {
  Place,
  PlaceAddress,
  PlaceNameTranslation,
} from '@knighthell-boilerplate-idl-proto/place/nestjs/place';
import { PlaceUserEntity } from '../plalce-user/place-user.entity';

export class PlaceEntity implements Place {
  id: string;
  latitude: number;
  longitude: number;
  createdBy: PlaceUserEntity | undefined;
  createdAt: Date | undefined;
  updatedBy: PlaceUserEntity | undefined;
  updatedAt: Date | undefined;
  deletedBy: PlaceUserEntity | undefined;
  deletedAt: Date | undefined;
  name: string;
  nameTranslation?: PlaceNameTranslation | undefined;
  address?: PlaceAddress | undefined;
}
