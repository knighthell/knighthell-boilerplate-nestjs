import { PlaceUser } from '@knighthell-boilerplate-idl-proto/place/ts/place-user';

export class PlaceUserEntity implements PlaceUser {
  id: string;
  email: string;
  displayName: string;
}
