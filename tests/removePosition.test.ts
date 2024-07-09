import { removePosition } from "../src/removePosition";
import { Positions, InputTx } from "../types";

describe("removePosition function", () => {
  it("should remove the position for the buyer", () => {
    const positions = new Map<string, number>([
      ["nft1", 100],
      ["nft2", 200],
    ]);
    const walletsWithPositions = new Map<string, Positions>([
      ["buyer1", positions],
    ]);

    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    removePosition(walletsWithPositions, inputTx);

    const buyerPositions = walletsWithPositions.get(inputTx.buyer);
    expect(buyerPositions).toBeDefined();
    expect(buyerPositions?.has("nft1")).toBe(false);
    expect(buyerPositions?.has("nft2")).toBe(true);
  });

  it("should handle the case when the position does not exist", () => {
    const positions = new Map<string, number>([["nft2", 200]]);
    const walletsWithPositions = new Map<string, Positions>([
      ["buyer1", positions],
    ]);

    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    removePosition(walletsWithPositions, inputTx);

    const buyerPositions = walletsWithPositions.get(inputTx.buyer);
    expect(buyerPositions).toBeDefined();
    expect(buyerPositions?.has("nft1")).toBe(false);
    expect(buyerPositions?.has("nft2")).toBe(true);
  });

  it("should handle the case when the buyer has no positions", () => {
    const walletsWithPositions = new Map<string, Positions>();

    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    removePosition(walletsWithPositions, inputTx);

    const buyerPositions = walletsWithPositions.get(inputTx.buyer);
    expect(buyerPositions).toBeUndefined();
  });

  it("should handle the case when the positions map is empty", () => {
    const positions = new Map<string, number>();
    const walletsWithPositions = new Map<string, Positions>([
      ["buyer1", positions],
    ]);

    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    removePosition(walletsWithPositions, inputTx);

    const buyerPositions = walletsWithPositions.get(inputTx.buyer);
    expect(buyerPositions).toBeDefined();
    expect(buyerPositions?.has("nft1")).toBe(false);
  });
});
