import { calcPositions } from "../src/calcPositions";
import { Positions } from "../types";

describe("caclPositions function", () => {
  it("should calculate unrealized correctly", () => {
    const positions: Positions = new Map([
      ["nft1", 100],
      ["nft2", 200],
    ]);

    const nftCollectionMap = new Map<string, string>([
      ["nft1", "collection1"],
      ["nft2", "collection2"],
    ]);

    const collectionsPrices = new Map<string, number>([
      ["collection1", 150],
      ["collection2", 250],
    ]);

    const result = calcPositions(
      positions,
      nftCollectionMap,
      collectionsPrices
    );

    expect(result).toBe(100); // (150 - 100) + (250 - 200) = 50 + 50 = 100
  });

  it("should throw an error if there is no collection for an NFT", () => {
    const positions: Positions = new Map([["nft1", 100]]);

    const nftCollectionMap = new Map<string, string>([["nft2", "collection1"]]);

    const collectionsPrices = new Map<string, number>([["collection1", 150]]);

    expect(() =>
      calcPositions(positions, nftCollectionMap, collectionsPrices)
    ).toThrow("No saved nft -> collection");
  });

  it("should throw an error if there is no last price for a collection", () => {
    const positions: Positions = new Map([["nft1", 100]]);

    const nftCollectionMap = new Map<string, string>([["nft1", "collection1"]]);

    const collectionsPrices = new Map<string, number>();

    expect(() =>
      calcPositions(positions, nftCollectionMap, collectionsPrices)
    ).toThrow("No saved last price for collection");
  });

  it("should handle empty positions map", () => {
    const positions: Positions = new Map();

    const nftCollectionMap = new Map<string, string>();
    const collectionsPrices = new Map<string, number>();

    const result = calcPositions(
      positions,
      nftCollectionMap,
      collectionsPrices
    );

    expect(result).toBe(0);
  });
});
