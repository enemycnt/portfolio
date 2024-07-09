import { updateCollectionsMaps } from "../src/updateCollectionsMaps";
import { InputTx } from "../types";

describe("updateCollectionsMaps function", () => {
  it("should add NFT to the nftCollectionMap", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    const nftCollectionMap = new Map<string, string>();
    const collectionsPricesMap = new Map<string, number>();

    updateCollectionsMaps(inputTx, nftCollectionMap, collectionsPricesMap);

    expect(nftCollectionMap.get(inputTx.nft)).toBe(inputTx.collection);
  });

  it("should add collection and price to the collectionsPricesMap if the collection is not already present", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    const nftCollectionMap = new Map<string, string>();
    const collectionsPricesMap = new Map<string, number>();

    updateCollectionsMaps(inputTx, nftCollectionMap, collectionsPricesMap);

    expect(collectionsPricesMap.get(inputTx.collection)).toBe(inputTx.price);
  });

  it("should not update the collectionsPricesMap if the collection is already present", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft2",
      collection: "collection1",
      price: 200,
    };

    const nftCollectionMap = new Map<string, string>();
    const collectionsPricesMap = new Map<string, number>([
      ["collection1", 100],
    ]);

    updateCollectionsMaps(inputTx, nftCollectionMap, collectionsPricesMap);

    expect(collectionsPricesMap.get(inputTx.collection)).toBe(100);
  });

  it("should handle multiple NFTs and collections correctly", () => {
    const inputTx1: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    const inputTx2: InputTx = {
      time: 1620000000,
      buyer: "buyer2",
      seller: "seller2",
      nft: "nft2",
      collection: "collection2",
      price: 200,
    };

    const nftCollectionMap = new Map<string, string>();
    const collectionsPricesMap = new Map<string, number>();

    updateCollectionsMaps(inputTx1, nftCollectionMap, collectionsPricesMap);
    updateCollectionsMaps(inputTx2, nftCollectionMap, collectionsPricesMap);

    expect(nftCollectionMap.get(inputTx1.nft)).toBe(inputTx1.collection);
    expect(nftCollectionMap.get(inputTx2.nft)).toBe(inputTx2.collection);
    expect(collectionsPricesMap.get(inputTx1.collection)).toBe(inputTx1.price);
    expect(collectionsPricesMap.get(inputTx2.collection)).toBe(inputTx2.price);
  });
});
