import { handleBuy } from "../src/handleBuy";
import { handleSell } from "../src/handleSell";
import { handleTransaction } from "../src/handleTransaction";
import { InputTx, Positions } from "../types";

jest.mock("../src/handleBuy");
jest.mock("../src/handleSell");

describe("handleTransaction function", () => {
  it("should handle a buy transaction when the seller does not have the NFT", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer1",
      seller: "seller1",
      nft: "nft1",
      collection: "collection1",
      price: 100,
    };

    const walletsWithNFTsMap = new Map<string, Set<string>>([
      ["seller1", new Set()],
    ]);
    const walletsWithPositionsMap = new Map<string, Positions>();
    const walletRealized = new Map<string, number>();
    const walletsForFeed = new Set<string>();

    handleTransaction(
      inputTx,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized,
      walletsForFeed
    );

    expect(handleBuy).toHaveBeenCalledWith(
      inputTx,
      new Set(),
      walletsWithNFTsMap,
      walletsWithPositionsMap
    );
    expect(walletsForFeed.has("buyer1")).toBe(true);
  });

  it("should handle a sell transaction when the seller has the NFT", () => {
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
      ["seller1", sellerNfts],
      ["buyer1", buyerNfts],
    ]);
    const walletsWithPositionsMap = new Map<string, Positions>();
    const walletRealized = new Map<string, number>();
    const walletsForFeed = new Set<string>();

    handleTransaction(
      inputTx,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized,
      walletsForFeed
    );

    expect(handleSell).toHaveBeenCalledWith(
      inputTx,
      sellerNfts,
      buyerNfts,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized
    );
    expect(walletsForFeed.has("seller1")).toBe(true);
    expect(walletsForFeed.has("buyer1")).toBe(true);
  });

  it("should add the buyer to walletsForFeed if it was a buy transaction", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer2",
      seller: "seller2",
      nft: "nft2",
      collection: "collection2",
      price: 200,
    };

    const walletsWithNFTsMap = new Map<string, Set<string>>();
    const walletsWithPositionsMap = new Map<string, Positions>();
    const walletRealized = new Map<string, number>();
    const walletsForFeed = new Set<string>();

    handleTransaction(
      inputTx,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized,
      walletsForFeed
    );

    expect(handleBuy).toHaveBeenCalledWith(
      inputTx,
      new Set(),
      walletsWithNFTsMap,
      walletsWithPositionsMap
    );
    expect(walletsForFeed.has("buyer2")).toBe(true);
  });

  it("should add both seller and buyer to walletsForFeed if it was a sell transaction", () => {
    const inputTx: InputTx = {
      time: 1620000000,
      buyer: "buyer3",
      seller: "seller3",
      nft: "nft3",
      collection: "collection3",
      price: 300,
    };

    const sellerNfts = new Set<string>(["nft3"]);
    const buyerNfts = new Set<string>();
    const walletsWithNFTsMap = new Map<string, Set<string>>([
      ["seller3", sellerNfts],
      ["buyer3", buyerNfts],
    ]);
    const walletsWithPositionsMap = new Map<string, Positions>();
    const walletRealized = new Map<string, number>();
    const walletsForFeed = new Set<string>();

    handleTransaction(
      inputTx,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized,
      walletsForFeed
    );

    expect(handleSell).toHaveBeenCalledWith(
      inputTx,
      sellerNfts,
      buyerNfts,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized
    );
    expect(walletsForFeed.has("seller3")).toBe(true);
    expect(walletsForFeed.has("buyer3")).toBe(true);
  });
});
