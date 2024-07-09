import { Positions } from "../types";

export function calcPositions(
  positions: Positions,
  nftCollectionMap: Map<string, string>,
  collectionsPricesMap: Map<string, number>
): number {
  let unrealized = 0;
  positions.forEach((price, nft) => {
    const collection = nftCollectionMap.get(nft);
    if (!collection) {
      throw new Error("No saved nft -> collection");
    }
    const lastPrice = collectionsPricesMap.get(collection);
    if (lastPrice === undefined) {
      throw new Error("No saved last price for collection");
    }
    const diffNftPrice = lastPrice - price;
    unrealized += diffNftPrice;
  });
  return unrealized;
}
