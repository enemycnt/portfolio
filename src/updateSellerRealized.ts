import { InputTx, Positions } from "../types";

export function updateSellerRealized(
  walletRealized: Map<string, number>,
  walletsWithPositionsMap: Map<string, Positions>,
  inputTx: InputTx
) {
  const positions = walletsWithPositionsMap.get(inputTx.seller);
  if (!positions) {
    return new Error("Should be open position to sell. No shorts");
  }
  const sellersRealized = walletRealized.get(inputTx.seller) ?? 0;

  const initialNftPrice = positions.get(inputTx.nft)!;
  const finalDifferecnce = inputTx.price - initialNftPrice;
  const realized = sellersRealized + finalDifferecnce;
  console.log("🚀 ~ realized:", realized);
  console.log("🚀 ~ inputTx.seller:", inputTx.seller);

  walletRealized.set(inputTx.seller, realized);
  return realized;
}
