import keyring from "@polkadot/ui-keyring";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { userListFetch } from "src/modules";

export const useKeyringInitalize = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loadKeyring = async () => {
    const { cryptoWaitReady } = await import("@polkadot/util-crypto");
    await cryptoWaitReady();

    try {
      keyring.loadAll({ ss58Format: 2, type: "ed25519" });
    } catch (e) {
      console.log("keyring loaded");
    }

    dispatch(userListFetch());
    console.log("keyring crypto initalized");
    setLoading(false);
  };
  useEffect(() => {
    loadKeyring();
  }, [dispatch]);
  return { loading };
};
