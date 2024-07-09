import fs from "node:fs";
import { Positions } from "../types";
import { calcPositions } from "./calcPositions";

export function writeWalletPositions(
  walletsForFeed: Set<string>,
  walletsWithPositionsMap: Map<string, Positions>,
  nftCollectionMap: Map<string, string>,
  collectionsPricesMap: Map<string, number>,
  walletRealized: Map<string, number>,
  time: number,
  stream: fs.WriteStream,
  isLastGroup: boolean
) {
  walletsForFeed.forEach((wallet) => {
    const positions = walletsWithPositionsMap.get(wallet)!;
    const unrealized = calcPositions(
      positions,
      nftCollectionMap,
      collectionsPricesMap
    );

    const realized = walletRealized.get(wallet) ?? 0;
    stream.write(
      JSON.stringify({
        time,
        wallet,
        realized,
        unrealized,
      }) + `${isLastGroup ? "" : ","}\n`
    );
  });
}

// export function writeWalletPositions(
//   walletsWithPositionsMap: Map<string, Positions>,
//   nftCollectionMap: Map<string, string>,
//   collectionsPricesMap: Map<string, number>,
//   walletBalance: Map<string, WalletBalanceEntry>,
//   time: number,
//   outputLogs: string[]
//   // stream: fs.WriteStream
// ) {
//   // console.log("🚀 ~ walletsWithPositionsMap:", walletsWithPositionsMap)
//   const arr: string[] = [];
//   walletsWithPositionsMap.forEach((positions, wallet) => {
//     const unrealized = caclPositions(
//       positions,
//       nftCollectionMap,
//       collectionsPricesMap
//     );

//     const walletRealized = walletBalance.get(wallet);
//     outputLogs.push(
//       JSON.stringify({
//         time,
//         wallet,
//         realized: walletRealized ?? 0,
//         unrealized,
//       }) + ",\n"
//     );
//   });
//   return arr;
// }
