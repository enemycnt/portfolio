import { handleFloorPriceItem } from "../src/handleFloorPriceItem";
import { FloorPriceItem } from "../types";

describe("handleFloorPriceItem function", () => {
  it("should add a new collection price to the map", () => {
    const collectionsPricesMap = new Map<string, number>();

    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection1",
      floorPrice: 100,
    };

    handleFloorPriceItem(floorPriceItem, collectionsPricesMap);

    expect(collectionsPricesMap.get(floorPriceItem.collection)).toBe(
      floorPriceItem.floorPrice
    );
  });

  it("should update an existing collection price in the map", () => {
    const collectionsPricesMap = new Map<string, number>([
      ["collection1", 100],
    ]);

    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection1",
      floorPrice: 150,
    };

    handleFloorPriceItem(floorPriceItem, collectionsPricesMap);

    expect(collectionsPricesMap.get(floorPriceItem.collection)).toBe(
      floorPriceItem.floorPrice
    );
  });

  it("should handle multiple collection prices in the map", () => {
    const collectionsPricesMap = new Map<string, number>([
      ["collection1", 100],
      ["collection2", 200],
    ]);

    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection2",
      floorPrice: 250,
    };

    handleFloorPriceItem(floorPriceItem, collectionsPricesMap);

    expect(collectionsPricesMap.get("collection1")).toBe(100);
    expect(collectionsPricesMap.get("collection2")).toBe(250);
  });

  it("should handle an empty collectionsPricesMap", () => {
    const collectionsPricesMap = new Map<string, number>();

    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection1",
      floorPrice: 100,
    };

    handleFloorPriceItem(floorPriceItem, collectionsPricesMap);

    expect(collectionsPricesMap.size).toBe(1);
    expect(collectionsPricesMap.get(floorPriceItem.collection)).toBe(
      floorPriceItem.floorPrice
    );
  });
});
