import { KeyringJson, KeyringStore } from "@polkadot/ui-keyring/types";
import { GDriveStorage } from "@orderbook/core/utils/KeyringStore/GDrive/drive";
import {
  GoogleDriveAccount,
  VersionedAccountStorage,
} from "@orderbook/core/utils/KeyringStore/GDrive/types";
import { createVersionedAccountStorage } from "@orderbook/core/utils/KeyringStore/GDrive/utils";

export class GDriveAccountsStore implements KeyringStore {
  private initialized = false;
  private list: GoogleDriveAccount[] = [];
  private readonly ACCOUNT_PREFIX = "account:";

  constructor(apiKey: string, clientId: string) {
    GDriveStorage.setOptions(apiKey, clientId);
  }

  private async init() {
    this.list = [];
    const files = await GDriveStorage.getAll();
    const jsons = files
      ?.filter((file) => file?.name?.includes(this.ACCOUNT_PREFIX))
      .map(async (file): Promise<GoogleDriveAccount> => {
        return {
          id: file.id as string,
          name: file.name as string,
          description: file.description as string,
          data: await GDriveStorage.get<VersionedAccountStorage>(
            file.id as string
          ),
        };
      });
    this.list = jsons ? await Promise.all(jsons) : [];
  }

  private async getList() {
    if (this.initialized) return this.list;
    await this.init();
    this.initialized = true;
    return this.list;
  }

  private async createAccount(key: string, value: VersionedAccountStorage) {
    const file = {
      name: key,
      description: value.v1?.meta?.name || "",
      json: JSON.stringify(value),
    };
    await GDriveStorage.create(file);
    await this.init();
  }

  all(cb: (key: string, value: KeyringJson) => void): void {
    this.getList().then((accounts) => {
      accounts.forEach((account) => {
        cb(account.name, account.data.v1);
      });
    });
  }

  get(key: string, cb: (value: KeyringJson) => void): void {
    this.getList().then((jsons) => {
      const item = jsons.find((item) => item.name === key);
      if (item) cb(item.data.v1);
    });
  }

  remove(key: string, cb: (() => void) | undefined): void {
    this.getList().then((jsons) => {
      const item = jsons.find((item) => item.name === key);
      if (item) {
        GDriveStorage.delete(item.id).then(() => {
          this.list = this.list.filter((item) => item.name !== key);
          cb && cb();
        });
      } else {
        cb && cb();
      }
    });
  }

  set(key: string, value: KeyringJson, cb: (() => void) | undefined): void {
    const json = createVersionedAccountStorage(key, value);
    if (!json) {
      console.log("set: json is undefined");
      return;
    }
    this.createAccount(key, json)
      .then(this.getList.bind(this))
      .then(() => cb && cb());
  }
}

export class TestGdriveStore {
  private access: boolean;

  constructor(apiKey: string, clientId: string) {
    GDriveStorage.setOptions(apiKey, clientId);
  }

  async enable() {
    try {
      await GDriveStorage.auth();
      this.access = true;
    } catch {
      this.access = false;
    }
  }

  async write(file: { name: string; description: string; json: string }) {
    await GDriveStorage.create(file);
  }

  async getAll() {
    const files = await GDriveStorage.getAll();
    console.log("get all ", files);
    const jsons = files?.map((item) => {
      return GDriveStorage.get(item.id as string);
    });
    return jsons ? Promise.all(jsons) : [];
  }
}
