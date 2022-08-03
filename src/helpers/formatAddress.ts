import keyring from "@polkadot/ui-keyring";

export const formatAddressToDefault = (addr: string): string => {
  return keyring.encodeAddress(addr, 42);
};

export const formatAddressToPolkadex = (addr: string): string => {
  return keyring.encodeAddress(addr, 88);
};
