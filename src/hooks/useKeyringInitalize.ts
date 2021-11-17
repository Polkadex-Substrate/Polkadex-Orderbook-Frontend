import keyring from "@polkadot/ui-keyring";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { polkadotWalletFetch } from "@polkadex/orderbook-modules";

export const useKeyringInitalize = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const { cryptoWaitReady } = await import("@polkadot/util-crypto");
      dispatch(polkadotWalletFetch());
      await cryptoWaitReady();
      try {
        keyring.loadAll({ type: "sr25519" });
      } catch (e) {
        console.log("could not load Keyring");
        // throw new Error()
      }
      console.log("keyring initalized in app");
      setLoading(false);
    };
    init();
  }, []);

  return { loading };
};
