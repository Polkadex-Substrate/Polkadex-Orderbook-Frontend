import keyring from "@polkadot/ui-keyring";
import { useEffect } from "react";
import { cryptoWaitReady } from "@polkadot/util-crypto";

export const useInit = () => {
  const cryptoWait = async () => {
    try {
      await cryptoWaitReady();
      keyring.loadAll({ ss58Format: 88, type: "sr25519" });
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    cryptoWait();
  }, []);
};
