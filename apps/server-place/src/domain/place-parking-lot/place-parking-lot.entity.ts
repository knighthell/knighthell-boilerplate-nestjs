import {
  ParkingLotType,
  ParkingSpace,
  PlaceParkingLot,
} from '@knighthell-boilerplate-idl-proto/place/ts/place-parking-lot';

export class PlaceParkingLotEntity implements PlaceParkingLot {
  isAvailableParking: boolean;
  types: ParkingLotType[];
  totalParkingSpace: number;
  outdoorParkingSpace?: ParkingSpace | undefined;
  indoorParkingSpace?: ParkingSpace | undefined;
  mechanicalParkingSpace?: ParkingSpace | undefined;
}
