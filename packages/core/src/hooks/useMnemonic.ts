import { cryptoWaitReady, mnemonicGenerate } from "@polkadot/util-crypto";
import { useEffect, useState } from "react";

export const useMnemonic = (defaultMnemonic = "") => {
  const [mnemonic, setMnemonic] = useState<Array<string>>();
  const [mnemoicString, setMnemonicString] = useState<string>();
  const [loading, setLoading] = useState(true);
  const isMnemonicFromSignUp = defaultMnemonic && defaultMnemonic.length > 0;

  const createMnemonic = async ({ defaultMnemonic = "" }) => {
    let mnemonicString = defaultMnemonic;
    if (!mnemonicString?.length) {
      await cryptoWaitReady();
      mnemonicString = mnemonicGenerate();
    }
    setMnemonicString(mnemonicString);
    const mnemonicList = mnemonicString.split(" ");
    setMnemonic(mnemonicList);
    setLoading(false);
  };
  useEffect(() => {
    createMnemonic({ defaultMnemonic });
  }, [defaultMnemonic]);

  return { mnemonic, mnemoicString, loading, isMnemonicFromSignUp };
};
