import { addPosition } from "../src/addPosition";
import { Positions, InputTx } from "../types";


describe('addPosition function', () => {
  it('should add a new position for the buyer', () => {
    const walletsWithPositions = new Map<string, Positions>();

    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100
    };

    addPosition(walletsWithPositions, inputTx);

    const buyerPositions = walletsWithPositions.get(inputTx.buyer);
    expect(buyerPositions).toBeDefined();
    expect(buyerPositions?.get(inputTx.nft)).toBe(inputTx.price);
  });

  it('should update an existing position for the buyer', () => {
    const positions = new Map<string, number>([
      ["nft1", 100]
    ]);
    const walletsWithPositions = new Map<string, Positions>([
      ["buyer1", positions]
    ]);

    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft2",
      collection: "collection1",
      price: 200
    };

    addPosition(walletsWithPositions, inputTx);

    const buyerPositions = walletsWithPositions.get(inputTx.buyer);
    expect(buyerPositions).toBeDefined();
    expect(buyerPositions?.get("nft1")).toBe(100);
    expect(buyerPositions?.get("nft2")).toBe(200);
  });

  it('should handle an empty walletsWithPositions map', () => {
    const walletsWithPositions = new Map<string, Positions>();

    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer2",
      seller: "seller2",
      nft: "nft3",
      collection: "collection2",
      price: 300
    };

    addPosition(walletsWithPositions, inputTx);

    const buyerPositions = walletsWithPositions.get(inputTx.buyer);
    expect(buyerPositions).toBeDefined();
    expect(buyerPositions?.get(inputTx.nft)).toBe(inputTx.price);
  });
});
