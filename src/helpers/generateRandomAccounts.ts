import { mnemonicGenerate } from "@polkadot/util-crypto";
import keyring from "@polkadot/ui-keyring";

export const generateAccountsWithMnemonics = (N: number) => {
  const res = [];
  for (let i = 0; i < N; i++) {
    const mnemonic = mnemonicGenerate();
    const { pair } = keyring.addUri(mnemonic);
    res.push({ mnemonic, address: pair.address });
  }
};
