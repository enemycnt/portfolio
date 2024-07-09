import { isFloorPriceItem } from "../src/isFloorPriceItem";
import { FloorPriceItem, InputTx } from "../types";

describe("isFloorPriceItem function", () => {
  it("should return true for a FloorPriceItem", () => {
    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection1",
      floorPrice: 100,
    };

    expect(isFloorPriceItem(floorPriceItem)).toBe(true);
  });

  it("should return false for an InputTx", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    expect(isFloorPriceItem(inputTx)).toBe(false);
  });
});
