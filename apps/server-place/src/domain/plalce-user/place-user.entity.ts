import { PlaceUser } from '@knighthell-boilerplate-idl-proto/place/nestjs/place-user';

export class PlaceUserEntity implements PlaceUser {
  id: string;
  email: string;
  photoURL: string;
  displayName: string;
}
