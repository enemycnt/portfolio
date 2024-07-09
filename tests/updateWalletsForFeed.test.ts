import { updateWalletsForFeed } from "../src/updateWalletsForFeed";
import { FloorPriceItem } from "../types";

describe("updateWalletsForFeed function", () => {
  it("should add wallets with matching NFT collection to walletsForFeed", () => {
    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection1",
      floorPrice: 100,
    };

    const nftCollectionMap = new Map<string, string>([
      ["nft1", "collection1"],
      ["nft2", "collection2"],
    ]);

    const walletsWithNFTsMap = new Map<string, Set<string>>([
      ["wallet1", new Set<string>(["nft1"])],
      ["wallet2", new Set<string>(["nft2"])],
    ]);

    const walletsForFeed = new Set<string>();

    updateWalletsForFeed(
      floorPriceItem,
      nftCollectionMap,
      walletsWithNFTsMap,
      walletsForFeed
    );

    expect(walletsForFeed.has("wallet1")).toBe(true);
    expect(walletsForFeed.has("wallet2")).toBe(false);
  });

  it("should handle multiple NFTs and collections correctly", () => {
    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection1",
      floorPrice: 100,
    };

    const nftCollectionMap = new Map<string, string>([
      ["nft1", "collection1"],
      ["nft2", "collection2"],
      ["nft3", "collection1"],
    ]);

    const walletsWithNFTsMap = new Map<string, Set<string>>([
      ["wallet1", new Set<string>(["nft1", "nft2"])],
      ["wallet2", new Set<string>(["nft3"])],
      ["wallet3", new Set<string>(["nft2"])],
    ]);

    const walletsForFeed = new Set<string>();

    updateWalletsForFeed(
      floorPriceItem,
      nftCollectionMap,
      walletsWithNFTsMap,
      walletsForFeed
    );

    expect(walletsForFeed.has("wallet1")).toBe(true);
    expect(walletsForFeed.has("wallet2")).toBe(true);
    expect(walletsForFeed.has("wallet3")).toBe(false);
  });

  it("should handle empty walletsWithNFTsMap gracefully", () => {
    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection1",
      floorPrice: 100,
    };

    const nftCollectionMap = new Map<string, string>();
    const walletsWithNFTsMap = new Map<string, Set<string>>();
    const walletsForFeed = new Set<string>();

    updateWalletsForFeed(
      floorPriceItem,
      nftCollectionMap,
      walletsWithNFTsMap,
      walletsForFeed
    );

    expect(walletsForFeed.size).toBe(0);
  });

  it("should not add wallets for NFTs not matching the collection", () => {
    const floorPriceItem: FloorPriceItem = {
      time: 1620000000,
      collection: "collection3",
      floorPrice: 100,
    };

    const nftCollectionMap = new Map<string, string>([
      ["nft1", "collection1"],
      ["nft2", "collection2"],
    ]);

    const walletsWithNFTsMap = new Map<string, Set<string>>([
      ["wallet1", new Set<string>(["nft1"])],
      ["wallet2", new Set<string>(["nft2"])],
    ]);

    const walletsForFeed = new Set<string>();

    updateWalletsForFeed(
      floorPriceItem,
      nftCollectionMap,
      walletsWithNFTsMap,
      walletsForFeed
    );

    expect(walletsForFeed.size).toBe(0);
  });
});
