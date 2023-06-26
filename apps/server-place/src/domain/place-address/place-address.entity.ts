import { PlaceAddress } from '@knighthell-boilerplate-idl/place/ts/place';

export class PlaceAddressEntity implements PlaceAddress {
  /** 도로명 주소 */
  roadNameAddress?: string | undefined;
  /** 지번 주소 */
  landLotAddress?: string | undefined;
  /** GeoHash: latitude, longitude 쌍을 단일 Base32 문자열로 인코딩하기 위한 시스템 */
  geohash?: string | undefined;
  /** w3w 주소 */
  w3wAddress?: string | undefined;
  /** PlusCode */
  plusCode?: string | undefined;
}
