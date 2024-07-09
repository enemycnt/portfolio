import { InputTx } from "../types";

export function updateCollectionsMaps(
  inputTx: InputTx,
  nftCollectionMap: Map<string, string>,
  collectionsPricesMap: Map<string, number>
) {
  nftCollectionMap.set(inputTx.nft, inputTx.collection);

  if (!collectionsPricesMap.has(inputTx.collection)) {
    collectionsPricesMap.set(inputTx.collection, inputTx.price);
  }
}
