import keyring from "@polkadot/ui-keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { CreateResult } from "@polkadot/ui-keyring/types";
import { KeyringPair, KeyringPair$Json } from "@polkadot/keyring/types";

import { TradingAccountExternalStorage, TradingAccountStore } from "./types";

class BrowserKeyringStore implements TradingAccountStore {
  private _isReady = false;
  async init(): Promise<void> {
    await cryptoWaitReady();
    keyring.loadAll({ ss58Format: 88, type: "sr25519" });
    this._isReady = true;
  }

  add(
    mnemonic: string,
    name: string,
    password: string | undefined
  ): CreateResult {
    return keyring.addUri(mnemonic, password, { name });
  }

  isReady(): boolean {
    return this._isReady;
  }

  addToExternalStorage(
    json: KeyringPair$Json,
    store: TradingAccountExternalStorage
  ): Promise<void> {
    return store.add(json);
  }

  async backupAllToExternalStorage(
    store: TradingAccountExternalStorage
  ): Promise<void> {
    const promises = keyring.getPairs().map((pair) => {
      return this.addToExternalStorage(pair.toJson(), store);
    });
    await Promise.all(promises);
  }

  getAll(): KeyringPair[] {
    return keyring.getPairs();
  }

  import(json: KeyringPair$Json, password: string) {
    return keyring.restoreAccount(json, password);
  }

  remove(address: string): void {
    return keyring.forgetAccount(address);
  }
}

export const browserKeyringStore = new BrowserKeyringStore();
