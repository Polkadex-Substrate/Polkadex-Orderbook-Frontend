import { GDriveStorage } from "@orderbook/core/utils/tradingAccountStore/GDriveStorage/GDrive/drive";
import { KeyringPair$Json } from "@polkadot/keyring/types";

import { TradingAccountExternalStorage } from "./../../types";
import { GoogleDriveAccount } from "./types";
export class GDriveAccountsStore implements TradingAccountExternalStorage {
  private initialized = false;
  private list: GoogleDriveAccount<KeyringPair$Json>[] = [];
  private readonly ACCOUNT_PREFIX = "account:";

  constructor(apiKey: string, clientId: string) {
    GDriveStorage.setOptions(apiKey, clientId);
  }

  isReady(): boolean {
    return this.initialized;
  }

  private async init() {
    this.list = [];
    const files = await GDriveStorage.getAll();
    const jsons = files
      ?.filter((file) => file?.name?.includes(this.ACCOUNT_PREFIX))
      .map(async (file): Promise<GoogleDriveAccount<KeyringPair$Json>> => {
        return {
          id: file.id as string,
          name: file.name as string,
          description: file.description as string,
          data: await GDriveStorage.get<KeyringPair$Json>(file.id as string),
        };
      });
    this.list = jsons ? await Promise.all(jsons) : [];
  }

  async getFiles() {
    if (this.initialized) return this.list;
    await this.init();
    this.initialized = true;
    return this.list;
  }

  private async createAccount(key: string, json: KeyringPair$Json) {
    const file = {
      name: key,
      description: json.meta?.name || "",
      json: JSON.stringify(json),
    };
    await GDriveStorage.create(file);
    await this.init();
  }

  async getAll(): Promise<KeyringPair$Json[]> {
    const files = await this.getFiles();
    return files.map((item) => item.data);
  }

  async remove(address: string) {
    const jsons = await this.getFiles();
    const item = jsons.find((item) => item.data.address === address);
    if (item) {
      GDriveStorage.delete(item.id).then(() => {
        this.list = this.list.filter((item) => item.data.address !== address);
      });
    }
  }

  async add(json: KeyringPair$Json): Promise<void> {
    await this.createAccount(json.address, json);
  }

  async get(address: string): Promise<KeyringPair$Json> {
    const jsons = await this.getFiles();
    const item = jsons.find((item) => item.data.address === address);
    if (!item)
      throw new Error(`[${this.constructor.name}]: Unable to find account`);
    return item.data;
  }
}
