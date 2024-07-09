import { addPosition } from "../src/addPosition";
import { handleBuy } from "../src/handleBuy";
import { InputTx, Positions } from "../types";

jest.mock("../src/addPosition");

describe("handleBuy function", () => {
  it("should add NFT to buyerNfts and update walletsWithNFTsMap and walletsWithPositionsMap", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    const buyerNfts = new Set<string>();
    const walletsWithNFTsMap = new Map<string, Set<string>>();
    const walletsWithPositionsMap = new Map<string, Positions>();

    handleBuy(inputTx, buyerNfts, walletsWithNFTsMap, walletsWithPositionsMap);

    expect(buyerNfts.has("nft1")).toBe(true);
    expect(walletsWithNFTsMap.get("buyer1")).toBe(buyerNfts);
    expect(addPosition).toHaveBeenCalledWith(walletsWithPositionsMap, inputTx);
  });

  it("should handle existing NFTs and positions", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft2",
      collection: "collection1",
      price: 200,
    };

    const buyerNfts = new Set<string>(["nft1"]);
    const walletsWithNFTsMap = new Map<string, Set<string>>([
      ["buyer1", new Set<string>(["nft1"])],
    ]);
    const walletsWithPositionsMap = new Map<string, Positions>();

    handleBuy(inputTx, buyerNfts, walletsWithNFTsMap, walletsWithPositionsMap);

    expect(buyerNfts.has("nft2")).toBe(true);
    expect(walletsWithNFTsMap.get("buyer1")).toBe(buyerNfts);
    expect(addPosition).toHaveBeenCalledWith(walletsWithPositionsMap, inputTx);
  });

  it("should handle empty buyerNfts and walletsWithNFTsMap", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer2",
      seller: "seller2",
      nft: "nft3",
      collection: "collection2",
      price: 300,
    };

    const buyerNfts = new Set<string>();
    const walletsWithNFTsMap = new Map<string, Set<string>>();
    const walletsWithPositionsMap = new Map<string, Positions>();

    handleBuy(inputTx, buyerNfts, walletsWithNFTsMap, walletsWithPositionsMap);

    expect(buyerNfts.has("nft3")).toBe(true);
    expect(walletsWithNFTsMap.get("buyer2")).toBe(buyerNfts);
    expect(addPosition).toHaveBeenCalledWith(walletsWithPositionsMap, inputTx);
  });
});
