import { Positions, InputTx } from "../types";

export function addPosition(
  walletsWithPositions: Map<string, Positions>,
  inputTx: InputTx
) {
  const positions = walletsWithPositions.get(inputTx.buyer) ?? new Map();
  positions.set(inputTx.nft, inputTx.price);
  walletsWithPositions.set(inputTx.buyer, positions);
}
