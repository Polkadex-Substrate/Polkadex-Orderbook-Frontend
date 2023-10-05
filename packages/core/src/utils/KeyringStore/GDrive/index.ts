import { KeyringJson, KeyringStore } from "@polkadot/ui-keyring/types";
import { string } from "yup";
import keyring from "@polkadot/ui-keyring";

export default class GDriveAccountsStore implements KeyringStore {
  all(cb: (key: string, value: KeyringJson) => void): void {}

  get(key: string, cb: (value: KeyringJson) => void): void {}

  remove(key: string, cb: (() => void) | undefined): void {}

  set(key: string, value: KeyringJson, cb: (() => void) | undefined): void {}
}
