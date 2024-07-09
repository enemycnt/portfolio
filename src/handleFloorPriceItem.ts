import { FloorPriceItem } from "../types";

export function handleFloorPriceItem(
  floorPriceItem: FloorPriceItem,
  collectionsPricesMap: Map<string, number>
) {
  collectionsPricesMap.set(
    floorPriceItem.collection,
    floorPriceItem.floorPrice
  );
}
