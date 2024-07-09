import { InputTx, Positions } from "../types";
import { addPosition } from "./addPosition";

export function handleBuy(
  inputTx: InputTx,
  buyerNfts: Set<string>,
  walletsWithNFTsMap: Map<string, Set<string>>,
  walletsWithPositionsMap: Map<string, Positions>
) {
  buyerNfts.add(inputTx.nft);
  walletsWithNFTsMap.set(inputTx.buyer, buyerNfts);
  addPosition(walletsWithPositionsMap, inputTx);
}
