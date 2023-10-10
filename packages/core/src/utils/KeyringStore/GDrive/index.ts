import { KeyringJson, KeyringStore } from "@polkadot/ui-keyring/types";
import { string } from "yup";
import keyring from "@polkadot/ui-keyring";
import { GoogleDriveApi } from "@orderbook/core/utils/KeyringStore/GDrive/api";
import { GoogleOauth } from "@orderbook/core/utils/KeyringStore/GDrive/oauth";
import {
  DRIVE_APPDATA_SCOPE,
  DRIVE_DISCOVERY_DOC,
  GDriveStorage,
} from "@orderbook/core/utils/KeyringStore/GDrive/drive";

export class GDriveAccountsStore implements KeyringStore {
  all(cb: (key: string, value: KeyringJson) => void): void {
    GDriveStorage.getAll().then((files) => {
      files?.forEach((file) => {
        file.name;
      });
    });
  }

  get(key: string, cb: (value: KeyringJson) => void): void {
    GDriveStorage.get(key).then((file) => {
      // eslint-disable-next-line node/no-callback-literal
      cb(file as KeyringJson);
    });
  }

  remove(key: string, cb: (() => void) | undefined): void {}

  set(key: string, value: KeyringJson, cb: (() => void) | undefined): void {}
}

export class TestGdriveStore {
  private access: boolean;
  constructor({ apiKeys, clientId }: { apiKeys: string; clientId: string }) {
    GDriveStorage.setOptions(apiKeys, clientId);
  }

  async enable() {
    try {
      await GDriveStorage.auth();
      this.access = true;
    } catch {
      this.access = false;
    }
  }

  async write(json: KeyringJson) {
    const file = {
      name: json.address,
      description: json?.meta?.name || "",
      json: JSON.stringify(json),
    };
    await GDriveStorage.create(file);
  }

  async getAll() {
    const files = await GDriveStorage.getAll();
    return files;
  }
}
