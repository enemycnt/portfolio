import { FloorPriceItem } from "../types";

export function updateWalletsForFeed(
  floorPriceItem: FloorPriceItem,
  nftCollectionMap: Map<string, string>,
  walletsWithNFTsMap: Map<string, Set<string>>,
  walletsForFeed: Set<string>
) {
  walletsWithNFTsMap.forEach((nfts, wallet) => {
    nfts.forEach((nft) => {
      const collection = nftCollectionMap.get(nft);
      if (collection === floorPriceItem.collection) {
        walletsForFeed.add(wallet);
      }
    });
  });
}
