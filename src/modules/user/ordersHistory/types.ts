export interface SetOrder {
  event_id: number;
  client_order_id: string;
  avg_filled_price: number;
  fee: number;
  filled_quantity: number;
  status: string;
  id: number;
  user: string;
  pair: Pair;
  side: string;
  order_type: string;
  qty: number;
  price: number;
  nonce: number;
}
interface Pair {
  base_asset: string | OtherAsset;
  quote_asset: string | OtherAsset;
}
interface OtherAsset {
  asset: number;
}
