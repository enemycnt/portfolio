export type InputTx = {
  time: number;
  buyer: string;
  seller: string;
  nft: string;
  collection: string;
  price: number;
};
export type FloorPriceItem = {
  time: number;
  collection: string;
  floorPrice: number;
};
export type MergedInputs = Array<FloorPriceItem | InputTx>;
export type Positions = Map<string, number>;
export type OutputTableLog = {
  time: number;
  nft: string;
  action: string;
  price: number;
  // buyer: string;
  // seller: string;
  realized: number;
  unrealized: number;
};
export type OutputResultLog = {
  time: number;
  wallet: string;
  realized: number;
  unrealized: number;
};
export type WalletBalanceEntry = {
  balance: number;
  realized: number;
};
