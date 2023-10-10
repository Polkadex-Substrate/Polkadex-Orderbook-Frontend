import { KeyringJson, KeyringStore } from "@polkadot/ui-keyring/types";
import { string } from "yup";
import keyring from "@polkadot/ui-keyring";
import { GoogleDriveApi } from "@orderbook/core/utils/KeyringStore/GDrive/api";
import { GoogleOauth } from "@orderbook/core/utils/KeyringStore/GDrive/oauth";
import {
  DRIVE_APPDATA_SCOPE,
  DRIVE_DISCOVERY_DOC,
} from "@orderbook/core/utils/KeyringStore/GDrive/drive";

export default class GDriveAccountsStore implements KeyringStore {
  protected readonly api!: GoogleDriveApi;
  protected readonly oauth!: GoogleOauth;

  protected readonly appDataFolder = "appDataFolder";
  protected readonly backupFolderName = "backupFolder";
  protected backupFolderId!: string;

  constructor({ api, oauth }: { api: GoogleDriveApi; oauth: GoogleOauth }) {
    this.api = api;
    this.oauth = oauth;
  }

  setOptions(apiKey: string, clientId: string) {
    this.api.setOptions({ apiKey, discoveryDocs: [DRIVE_DISCOVERY_DOC] });
    this.oauth.setOptions({ clientId, scope: DRIVE_APPDATA_SCOPE });
  }

  async init(): Promise<void> {
    await Promise.all([this.api, this.oauth].map((client) => client.init()));
  }

  async auth(): Promise<void> {
    await this.init();
    await this.oauth.checkToken();
  }

  all(cb: (key: string, value: KeyringJson) => void): void {}

  get(key: string, cb: (value: KeyringJson) => void): void {
    this.auth().then(() => {
      this.api.readFile(key).then((file) => {
        cb(file as KeyringJson);
      });
    });
  }

  remove(key: string, cb: (() => void) | undefined): void {}

  set(key: string, value: KeyringJson, cb: (() => void) | undefined): void {}
}
