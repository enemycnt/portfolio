import { InputTx, Positions } from "../types";
import { addPosition } from "./addPosition";
import { removePosition } from "./removePosition";
import { updateSellerRealized } from "./updateSellerRealized";

export function handleSell(
  inputTx: InputTx,
  sellerNfts: Set<string>,
  buyerNfts: Set<string>,
  walletsWithNFTsMap: Map<string, Set<string>>,
  walletsWithPositionsMap: Map<string, Positions>,
  walletRealized: Map<string, number>
) {
  sellerNfts.delete(inputTx.nft);
  removePosition(walletsWithPositionsMap, inputTx);
  updateSellerRealized(walletRealized, walletsWithPositionsMap, inputTx);

  buyerNfts.add(inputTx.nft);
  walletsWithNFTsMap.set(inputTx.buyer, buyerNfts);

  addPosition(walletsWithPositionsMap, inputTx);
}
