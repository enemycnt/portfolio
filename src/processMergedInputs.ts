import fs from "node:fs";
import { FloorPriceItem, InputTx, Positions } from "../types";
import { debugMemoryUsage } from "./debugMemoryUsage";
import { handleFloorPriceItem } from "./handleFloorPriceItem";
import { handleTransaction } from "./handleTransaction";
import { isFloorPriceItem } from "./isFloorPriceItem";
import { updateCollectionsMaps } from "./updateCollectionsMaps";
import { writeWalletPositions } from "./writeWalletPositions";
import { OUTPUT_WALLETS_PATH } from "./constants";
import { updateWalletsForFeed } from "./updateWalletsForFeed";

export function processMergedInputs(
  groupedMergedInputs: Map<number, Array<FloorPriceItem | InputTx>>
): void {
  console.time("process");

  const nftCollectionMap = new Map<string, string>();
  const collectionsPricesMap = new Map<string, number>();
  const walletsWithNFTsMap = new Map<string, Set<string>>();
  const walletsWithPositionsMap = new Map<string, Positions>();
  const walletRealized = new Map<string, number>();

  const stream = fs.createWriteStream(OUTPUT_WALLETS_PATH, {
    flags: "w",
  });
  stream.write("[\n");

  const lastItemTime = Array.from(groupedMergedInputs.keys()).pop();
  groupedMergedInputs.forEach((mergedInputs, time) => {
    const walletsForFeed: Set<string> = new Set();
    mergedInputs.forEach((inputItem) => {
      // Router logick with type guard
      if (isFloorPriceItem(inputItem)) {
        const floorPriceItem = inputItem as FloorPriceItem;
        if (collectionsPricesMap.has(floorPriceItem.collection)) {
          handleFloorPriceItem(floorPriceItem, collectionsPricesMap);
        }
        updateWalletsForFeed(
          floorPriceItem,
          nftCollectionMap,
          walletsWithNFTsMap,
          walletsForFeed
        );
      } else {
        // Save nft -> collection relations for quick access
        // Save collection prices for a quick access
        const inputTx = inputItem as InputTx;
        updateCollectionsMaps(inputTx, nftCollectionMap, collectionsPricesMap);
        handleTransaction(
          inputTx,
          walletsWithNFTsMap,
          walletsWithPositionsMap,
          walletRealized,
          walletsForFeed
        );
      }
    });
    const isLastGroup = lastItemTime === time;
    writeWalletPositions(
      walletsForFeed,
      walletsWithPositionsMap,
      nftCollectionMap,
      collectionsPricesMap,
      walletRealized,
      time,
      stream,
      isLastGroup
    );
  });
  stream.end("]");

  console.timeEnd("process");
  debugMemoryUsage();
}
