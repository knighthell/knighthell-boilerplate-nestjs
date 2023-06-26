import { PlaceUser } from '@knighthell-boilerplate-idl/place/ts/place-user';

export class PlaceUserEntity implements PlaceUser {
  id: string;
  email: string;
  displayName: string;
}
