import { InputTx, FloorPriceItem } from "../types";

export function isFloorPriceItem(
  item: InputTx | FloorPriceItem
): item is FloorPriceItem {
  return (item as FloorPriceItem).floorPrice !== undefined;
}
