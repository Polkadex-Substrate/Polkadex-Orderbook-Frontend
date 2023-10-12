import { KeyringJson } from "@polkadot/ui-keyring/types";
import { VersionedAccountStorage } from "@orderbook/core/utils/KeyringStore/GDrive/types";

export function createVersionedAccountStorage(
  key: string,
  json: KeyringJson,
  version = 1
): VersionedAccountStorage | undefined {
  if (version === 1) {
    return { v1: json };
  }
}
