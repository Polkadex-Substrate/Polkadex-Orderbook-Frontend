import keyring from "@polkadot/ui-keyring";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userListFetch } from "src/modules";
import { polkadotWalletFetch } from "src/modules/user/polkadotWallet";
import { Keyring } from '@polkadot/api'
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
      const p=keyring.addUri("sample split bamboo west visual approve brain fox arch impact relief smile")
      console.log("the address we neeed", p.pair.address)
    } catch (e) {
      console.log("keyring loaded");
    }

    dispatch(userListFetch());
    dispatch(polkadotWalletFetch())
    console.log("keyring crypto initalized");
    setLoading(false);
  };
  useEffect(() => {
    loadKeyring();
  }, [dispatch]);
  return { loading };
};
