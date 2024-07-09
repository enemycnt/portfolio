import { Positions, InputTx } from "../types";

export function removePosition(
  walletsWithPositions: Map<string, Positions>,
  inputTx: InputTx
) {
  const positions = walletsWithPositions.get(inputTx.buyer);
  if (positions) {
    positions.delete(inputTx.nft);

    walletsWithPositions.set(inputTx.buyer, positions);
  }
}
