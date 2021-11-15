import keyring from "@polkadot/ui-keyring";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { polkadotWalletFetch } from "src/modules/user/polkadotWallet";

export const useKeyringInitalize = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const init = async () => {
      const { cryptoWaitReady } = await import("@polkadot/util-crypto");
      dispatch(polkadotWalletFetch());
      await cryptoWaitReady();
      try {
        keyring.loadAll({ type: "ed25519" });
      } catch (e) {
        throw new Error("could not load Keyring");
      }
      console.log("keyring initalized in app");
      setLoading(false);
    };
    init();
  }, []);
  return { loading };
};
