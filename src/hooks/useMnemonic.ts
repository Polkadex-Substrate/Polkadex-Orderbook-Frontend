import { cryptoWaitReady, mnemonicGenerate } from "@polkadot/util-crypto";
import { useEffect, useState } from "react";

export const useMnemonic = (defaultMnemonic = "") => {
  const [mnemonic, setMnemonic] = useState<Array<string>>();
  const [mnemoicString, setMnemonicString] = useState<string>();
  const [loading, setLoading] = useState(true);
  const isMnemonicFromSignUp = defaultMnemonic && defaultMnemonic.length > 0;

  const createMnemonic = async ({ defaultMnemonic = "" }) => {
    let mnemonic_string = defaultMnemonic;
    if (!mnemonic_string?.length) {
      await cryptoWaitReady();
      mnemonic_string = mnemonicGenerate();
    }
    setMnemonicString(mnemonic_string);
    const mnemonicList = mnemonic_string.split(" ");
    setMnemonic(mnemonicList);
    setLoading(false);
  };
  useEffect(() => {
    createMnemonic({ defaultMnemonic });
  }, [defaultMnemonic]);

  return { mnemonic, mnemoicString, loading, isMnemonicFromSignUp };
};
