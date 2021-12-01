import keyring from "@polkadot/ui-keyring";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { polkadotWalletFetch } from "@polkadex/orderbook-modules";

export const useKeyringInitalize = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [error, setError] = useState("");

  const init = async () => {
    try {
      dispatch(polkadotWalletFetch());
      setShouldFetch(false);
    } catch (e) {
      setError(e.message);
      console.log("Could not load Keyring:", e.message);
      // throw new Error()
    }
    setLoading(false);
  };
  useEffect(() => {
    if (shouldFetch && !error) init();
  }, [shouldFetch, error]);

  return { loading };
};
