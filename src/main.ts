import { INPUT_TX_PATH, INPUT_FLOORPRICES_PATH } from "./constants";
import { readJson } from "./readJson";
import { InputTx, FloorPriceItem, MergedInputs } from "../types";
import { groupByToMap } from "./groupByToMap";
import { processMergedInputs } from "./processMergedInputs";

export async function main() {
  const inputTxs = (await readJson(INPUT_TX_PATH)) as InputTx[];

  const floorPricesItems = (await readJson(
    INPUT_FLOORPRICES_PATH
  )) as FloorPriceItem[];

  const mergedInputs: MergedInputs = [...inputTxs, ...floorPricesItems].sort(
    (a, b) => a.time - b.time
  );

  const grouped = groupByToMap(
    mergedInputs,
    (el: InputTx | FloorPriceItem) => el.time
  );

  processMergedInputs(grouped);
}
