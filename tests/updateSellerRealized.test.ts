import { updateSellerRealized } from "../src/updateSellerRealized";
import { Positions, InputTx } from "../types";

describe("sell function", () => {
  it("should calculate realized correctly and update walletRealized map", () => {
    const walletRealized = new Map<string, number>();
    const walletsWithPositionsMap = new Map<string, Positions>();

    const seller = "seller1";
    const nft = "nft1";
    const initialPrice = 100;
    const sellPrice = 150;

    const positions = new Map<string, number>();
    positions.set(nft, initialPrice);
    walletsWithPositionsMap.set(seller, positions);

    const inputTx: InputTx = {
      time: 1,
      buyer: "buyer1",
      collection: "collection",
      seller,
      nft,
      price: sellPrice,
    };

    const result = updateSellerRealized(
      walletRealized,
      walletsWithPositionsMap,
      inputTx
    );

    expect(result).toBe(sellPrice - initialPrice);
    expect(walletRealized.get(seller)).toBe(sellPrice - initialPrice);
  });

  it("should return an error if there is no open position for the seller", () => {
    const walletRealized = new Map<string, number>();
    const walletsWithPositionsMap = new Map<string, Positions>();

    const inputTx: InputTx = {
      time: 1,
      buyer: "buyer1",
      collection: "collection",
      seller: "seller2",
      nft: "nft1",
      price: 150,
    };

    const result = updateSellerRealized(
      walletRealized,
      walletsWithPositionsMap,
      inputTx
    );

    expect(result).toEqual(
      new Error("Should be open position to sell. No shorts")
    );
  });

  it("should handle existing realized amount correctly", () => {
    const walletRealized = new Map<string, number>([["seller1", 50]]);
    const walletsWithPositionsMap = new Map<string, Positions>();

    const seller = "seller1";
    const nft = "nft1";
    const initialPrice = 100;
    const sellPrice = 150;

    const positions = new Map<string, number>();
    positions.set(nft, initialPrice);
    walletsWithPositionsMap.set(seller, positions);

    const inputTx: InputTx = {
      time: 1,
      buyer: "buyer1",
      collection: "collection",
      seller,
      nft,
      price: sellPrice,
    };

    const result = updateSellerRealized(
      walletRealized,
      walletsWithPositionsMap,
      inputTx
    );

    expect(result).toBe(100); // 50 (existing realized) + 50 (price difference)
    expect(walletRealized.get(seller)).toBe(100);
  });
});
