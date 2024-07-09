import { addPosition } from "../src/addPosition";
import { handleSell } from "../src/handleSell";
import { removePosition } from "../src/removePosition";
import { updateSellerRealized } from "../src/updateSellerRealized";
import { InputTx, Positions } from "../types";

jest.mock("../src/addPosition");
jest.mock("../src/removePosition");
jest.mock("../src/updateSellerRealized");

describe("handleSell function", () => {
  it("should handle the sell transaction correctly", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    const sellerNfts = new Set<string>(["nft1"]);
    const buyerNfts = new Set<string>();
    const walletsWithNFTsMap = new Map<string, Set<string>>([
      ["seller1", new Set<string>(["nft1"])],
      ["buyer1", new Set<string>()],
    ]);
    const walletsWithPositionsMap = new Map<string, Positions>();
    const walletRealized = new Map<string, number>();

    handleSell(
      inputTx,
      sellerNfts,
      buyerNfts,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized
    );

    expect(sellerNfts.has("nft1")).toBe(false);
    expect(buyerNfts.has("nft1")).toBe(true);
    expect(walletsWithNFTsMap.get("buyer1")).toBe(buyerNfts);
    expect(removePosition).toHaveBeenCalledWith(
      walletsWithPositionsMap,
      inputTx
    );
    expect(updateSellerRealized).toHaveBeenCalledWith(
      walletRealized,
      walletsWithPositionsMap,
      inputTx
    );
    expect(addPosition).toHaveBeenCalledWith(walletsWithPositionsMap, inputTx);
  });

  it("should handle the case when seller does not have the NFT", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer2",
      seller: "seller2",
      nft: "nft2",
      collection: "collection2",
      price: 200,
    };

    const sellerNfts = new Set<string>();
    const buyerNfts = new Set<string>();
    const walletsWithNFTsMap = new Map<string, Set<string>>();
    const walletsWithPositionsMap = new Map<string, Positions>();
    const walletRealized = new Map<string, number>();

    handleSell(
      inputTx,
      sellerNfts,
      buyerNfts,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized
    );

    expect(sellerNfts.has("nft2")).toBe(false);
    expect(buyerNfts.has("nft2")).toBe(true);
    expect(walletsWithNFTsMap.get("buyer2")).toBe(buyerNfts);
    expect(removePosition).toHaveBeenCalledWith(
      walletsWithPositionsMap,
      inputTx
    );
    expect(updateSellerRealized).toHaveBeenCalledWith(
      walletRealized,
      walletsWithPositionsMap,
      inputTx
    );
    expect(addPosition).toHaveBeenCalledWith(walletsWithPositionsMap, inputTx);
  });

  it("should handle the case when buyer already has NFTs", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer3",
      seller: "seller3",
      nft: "nft3",
      collection: "collection3",
      price: 300,
    };

    const sellerNfts = new Set<string>(["nft3"]);
    const buyerNfts = new Set<string>(["nft1", "nft2"]);
    const walletsWithNFTsMap = new Map<string, Set<string>>([
      ["seller3", new Set<string>(["nft3"])],
      ["buyer3", new Set<string>(["nft1", "nft2"])],
    ]);
    const walletsWithPositionsMap = new Map<string, Positions>();
    const walletRealized = new Map<string, number>();

    handleSell(
      inputTx,
      sellerNfts,
      buyerNfts,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized
    );

    expect(sellerNfts.has("nft3")).toBe(false);
    expect(buyerNfts.has("nft3")).toBe(true);
    expect(walletsWithNFTsMap.get("buyer3")).toBe(buyerNfts);
    expect(removePosition).toHaveBeenCalledWith(
      walletsWithPositionsMap,
      inputTx
    );
    expect(updateSellerRealized).toHaveBeenCalledWith(
      walletRealized,
      walletsWithPositionsMap,
      inputTx
    );
    expect(addPosition).toHaveBeenCalledWith(walletsWithPositionsMap, inputTx);
  });
});
