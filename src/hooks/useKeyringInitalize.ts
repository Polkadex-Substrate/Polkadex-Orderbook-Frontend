import keyring from "@polkadot/ui-keyring";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { userListFetch } from "src/modules";
import { polkadotWalletFetch } from "src/modules/user/polkadotWallet";

export const useKeyringInitalize = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loadKeyring = async () => {
    const { cryptoWaitReady } = await import("@polkadot/util-crypto");
    await cryptoWaitReady();
    // const keyring_sr = new Keyring({ type: "sr25519" })
    // console.log({ keyring_sr })
    try {
      keyring.loadAll({ ss58Format: 2, type: "ed25519" });
    } catch (e) {
      throw new Error("could not load Keyring");
    }
    dispatch(userListFetch());
    console.log("keyring crypto initalized");
    setLoading(false);
  };

  useEffect(() => {
    dispatch(polkadotWalletFetch());
  }, []);

  useEffect(() => {
    loadKeyring();
  }, [dispatch]);

  return { loading };
};
