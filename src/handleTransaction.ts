import { InputTx, Positions } from "../types";
import { handleSell } from "./handleSell";
import { handleBuy } from "./handleBuy";

export function handleTransaction(
  inputTx: InputTx,
  walletsWithNFTsMap: Map<string, Set<string>>,
  walletsWithPositionsMap: Map<string, Positions>,
  walletRealized: Map<string, number>,
  walletsForFeed: Set<string>
) {
  const sellerNfts = walletsWithNFTsMap.get(inputTx.seller) ?? new Set();
  const buyerNfts = walletsWithNFTsMap.get(inputTx.buyer) ?? new Set();

  if (!sellerNfts.has(inputTx.nft)) {
    handleBuy(inputTx, buyerNfts, walletsWithNFTsMap, walletsWithPositionsMap);
  } else {
    walletsForFeed.add(inputTx.seller);

    handleSell(
      inputTx,
      sellerNfts,
      buyerNfts,
      walletsWithNFTsMap,
      walletsWithPositionsMap,
      walletRealized
    );
  }
  walletsForFeed.add(inputTx.buyer);
}
