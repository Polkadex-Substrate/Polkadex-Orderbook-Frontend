import { KeyringJson } from "@polkadot/ui-keyring/types";

export interface VersionedAccountStorage {
  v1: KeyringJson;
}

export interface GoogleDriveAccount {
  id: string;
  name: string;
  description: string;
  data: VersionedAccountStorage;
}
