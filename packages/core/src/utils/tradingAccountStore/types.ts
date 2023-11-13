import { CreateResult } from "@polkadot/ui-keyring/types";
import { KeyringPair, KeyringPair$Json } from "@polkadot/keyring/types";

interface Base {
  init: () => Promise<void>;
  isReady: () => boolean;
}
export interface TradingAccountExternalStorage extends Base {
  id: string;
  getAll(): Promise<KeyringPair$Json[]>;
  get(address: string): Promise<KeyringPair$Json>;
  add(json: KeyringPair$Json): Promise<void>;
  remove(address: string): Promise<void>;
}

export interface TradingAccountStore extends Base {
  import(json: KeyringPair$Json, password: string): KeyringPair;
  remove(address: string): void;
  getAll(): KeyringPair[];
  add(
    mnemonic: string,
    name: string,
    password: string | undefined
  ): CreateResult;
  addToExternalStorage(
    json: KeyringPair$Json,
    store: TradingAccountExternalStorage
  ): Promise<void>;
  backupAllToExternalStorage(
    store: TradingAccountExternalStorage
  ): Promise<void>;
}
