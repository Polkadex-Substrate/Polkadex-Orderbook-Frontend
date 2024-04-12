export type Maybe<T> = T | null | undefined;

export type SubscanResult<T, S extends string> = {
  code: number;
  message: string;
  data: {
    count: number;
  } & {
    [K in S]: T[];
  };
};
export interface TransferHistory {
  from: string;
  to: string;
  extrinsic_index: string;
  success: boolean;
  hash: string;
  block_num: number;
  block_timestamp: number;
  module: string;
  amount: string;
  amount_v2: string;
  usd_amount: string;
  fee: string;
  nonce: number;
  asset_symbol: string;
  asset_unique_id: string;
  asset_type: string;
  item_id: any;
  from_account_display: FromAccountDisplay;
  to_account_display: ToAccountDisplay;
  event_idx: number;
  item_detail: any;
}

export interface FromAccountDisplay {
  address: string;
}

export interface ToAccountDisplay {
  address: string;
  display: string;
}
