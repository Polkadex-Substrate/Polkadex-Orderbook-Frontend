import { KeyringPair } from "@polkadot/keyring/types";

export interface ProxyAccount {
  proxy_id: string;
  main_acc_id: string;
  accountName: string;
  address: string;
  keyringPair?: KeyringPair;
  created_at?: string;
  state?: string;
}
export interface UserSkeleton {
  username: string;
  address: string;
}
