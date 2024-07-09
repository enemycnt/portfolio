import fs from "node:fs";
import { calcPositions } from "../src/calcPositions";
import { writeWalletPositions } from "../src/writeWalletPositions";
import { Positions } from "../types";

jest.mock("node:fs");
jest.mock("../src/calcPositions");

describe("writeWalletPositions function", () => {
  let mockStream: fs.WriteStream;

  beforeEach(() => {
    mockStream = {
      write: jest.fn(),
    } as unknown as fs.WriteStream;
    (calcPositions as jest.Mock).mockReturnValue(50);
  });

  it("should write the correct wallet positions to the stream", () => {
    const walletsForFeed = new Set<string>(["wallet1"]);
    const positions = new Map<string, number>([["nft1", 100]]);
    const walletsWithPositionsMap = new Map<string, Positions>([
      ["wallet1", positions],
    ]);
    const nftCollectionMap = new Map<string, string>([["nft1", "collection1"]]);
    const collectionsPricesMap = new Map<string, number>([
      ["collection1", 150],
    ]);
    const walletRealized = new Map<string, number>([["wallet1", 100]]);
    const time = 1620000000;
    const isLastGroup = false;

    writeWalletPositions(
      walletsForFeed,
      walletsWithPositionsMap,
      nftCollectionMap,
      collectionsPricesMap,
      walletRealized,
      time,
      mockStream,
      isLastGroup
    );

    expect(mockStream.write).toHaveBeenCalledWith(
      JSON.stringify({
        time,
        wallet: "wallet1",
        realized: 100,
        unrealized: 50,
      }) + ",\n"
    );
  });

  it("should handle empty walletRealized map", () => {
    const walletsForFeed = new Set<string>(["wallet1"]);
    const positions = new Map<string, number>([["nft1", 100]]);
    const walletsWithPositionsMap = new Map<string, Positions>([
      ["wallet1", positions],
    ]);
    const nftCollectionMap = new Map<string, string>([["nft1", "collection1"]]);
    const collectionsPricesMap = new Map<string, number>([
      ["collection1", 150],
    ]);
    const walletRealized = new Map<string, number>();
    const time = 1620000000;
    const isLastGroup = false;

    writeWalletPositions(
      walletsForFeed,
      walletsWithPositionsMap,
      nftCollectionMap,
      collectionsPricesMap,
      walletRealized,
      time,
      mockStream,
      isLastGroup
    );

    expect(mockStream.write).toHaveBeenCalledWith(
      JSON.stringify({
        time,
        wallet: "wallet1",
        realized: 0,
        unrealized: 50,
      }) + ",\n"
    );
  });

  it("should handle multiple wallets", () => {
    const walletsForFeed = new Set<string>(["wallet1", "wallet2"]);
    const positions1 = new Map<string, number>([["nft1", 100]]);
    const positions2 = new Map<string, number>([["nft2", 200]]);
    const walletsWithPositionsMap = new Map<string, Positions>([
      ["wallet1", positions1],
      ["wallet2", positions2],
    ]);
    const nftCollectionMap = new Map<string, string>([
      ["nft1", "collection1"],
      ["nft2", "collection2"],
    ]);
    const collectionsPricesMap = new Map<string, number>([
      ["collection1", 150],
      ["collection2", 250],
    ]);
    const walletRealized = new Map<string, number>([
      ["wallet1", 100],
      ["wallet2", 200],
    ]);
    const time = 1620000000;
    const isLastGroup = false;

    writeWalletPositions(
      walletsForFeed,
      walletsWithPositionsMap,
      nftCollectionMap,
      collectionsPricesMap,
      walletRealized,
      time,
      mockStream,
      isLastGroup
    );

    expect(mockStream.write).toHaveBeenCalledWith(
      JSON.stringify({
        time,
        wallet: "wallet1",
        realized: 100,
        unrealized: 50,
      }) + ",\n"
    );

    expect(mockStream.write).toHaveBeenCalledWith(
      JSON.stringify({
        time,
        wallet: "wallet2",
        realized: 200,
        unrealized: 50,
      }) + ",\n"
    );
  });

  it("should handle the last group correctly", () => {
    const walletsForFeed = new Set<string>(["wallet1"]);
    const positions = new Map<string, number>([["nft1", 100]]);
    const walletsWithPositionsMap = new Map<string, Positions>([
      ["wallet1", positions],
    ]);
    const nftCollectionMap = new Map<string, string>([["nft1", "collection1"]]);
    const collectionsPricesMap = new Map<string, number>([
      ["collection1", 150],
    ]);
    const walletRealized = new Map<string, number>([["wallet1", 100]]);
    const time = 1620000000;
    const isLastGroup = true;

    writeWalletPositions(
      walletsForFeed,
      walletsWithPositionsMap,
      nftCollectionMap,
      collectionsPricesMap,
      walletRealized,
      time,
      mockStream,
      isLastGroup
    );

    expect(mockStream.write).toHaveBeenCalledWith(
      JSON.stringify({
        time,
        wallet: "wallet1",
        realized: 100,
        unrealized: 50,
      }) + "\n"
    );
  });
});
