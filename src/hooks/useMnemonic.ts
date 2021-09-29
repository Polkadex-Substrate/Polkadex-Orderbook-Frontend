import { cryptoWaitReady, mnemonicGenerate } from "@polkadot/util-crypto";
import { useEffect, useState } from "react";

export const useMnemonic = ({ isExport = false }) => {
  const [mnemonic, setmnemonic] = useState<Array<string>>();
  const [mnemoicString, setMnemonicString] = useState<string>();
  const [loading, setLoading] = useState(true);

  const createMnemonic = async () => {
    await cryptoWaitReady();
    const mnemonic_string = mnemonicGenerate();
    setMnemonicString(mnemonic_string);
    const mnemonicList = mnemonic_string.split(" ");
    setmnemonic(mnemonicList);
    setLoading(false);
  };
  useEffect(() => {
    if (isExport) createMnemonic();
  }, [isExport]);
  return { mnemonic, mnemoicString, loading };
};
