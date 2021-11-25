import { KeyringPair } from "@polkadot/keyring/types";

export interface ProxyAccount {
  accountName: string;
  password: string;
  address: string;
  keyringPair?: KeyringPair;
  created_at?: string;
  state?: string;
}
export interface UserSkeleton {
  username: string;
  address: string;
}
