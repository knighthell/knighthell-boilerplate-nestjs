import { PlaceLocation } from '@knighthell-boilerplate-idl/place/ts/place';

export class PlaceLocationEntity implements PlaceLocation {
  /** GPS WGS84 위도 */
  latitude: number;
  /** GPS WGS84 경도 */
  longitude: number;
}
