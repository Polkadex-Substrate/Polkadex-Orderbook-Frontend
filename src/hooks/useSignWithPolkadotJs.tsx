import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { blake2AsHex } from "@polkadot/util-crypto";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTimestampPeriod } from "src/helpers";

export const useSignWithPolkadotJs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Get Extension Accounts
  const getExtensionAddress = async (): Promise<
    InjectedAccountWithMeta | undefined
  > => {
    const polkadotExtensionDapp = await import("@polkadot/extension-dapp");
    const extension = await polkadotExtensionDapp.web3Enable("Polkadex");
    if (extension?.length > 0) {
      const allAccounts = await polkadotExtensionDapp.web3Accounts();

      if (allAccounts.length > 0) {
        return allAccounts[0];
      } else {
        setError("Please create account in Polkadot.{js} extension");
      }
    } else {
      setError("Please install Polkadot.{js} extension");
    }
  };

  // SignIn OpenFinex
  const fetchPolkadotJs = async () => {
    setLoading(true);

    try {
      const polkadotExtensionDapp = await import("@polkadot/extension-dapp");
      const account = await getExtensionAddress();
      if (account) {
        const nonce = getTimestampPeriod(1593676605, 0);
        const messageToSign = "#" + account.address + "#" + nonce;
        console.log("Message To Sign", messageToSign);
        const {
          signer: { signRaw },
        } = await polkadotExtensionDapp.web3FromSource(account.meta.source);

        if (signRaw) {
          const hash = blake2AsHex(messageToSign);
          const result = await signRaw({
            address: account.address,
            data: hash,
            type: "bytes",
          });

          console.log("Signature:", result.signature);

          const payload = {
            nickname: account.address,
            algo: "SR25519",
            hash: "Blake2",
            nonce: nonce,
            signature: result.signature,
            captcha_response: "",
          };
          //! SignUp
          console.log("Dispatch SignInWithPolkadotjS, Result?");
        } else {
          setError("No SignIn");
        }
      } else {
        setError("No Accounts");
      }
    } catch (error) {
      console.log("Error to connect:", error.message);
    }
    setLoading(false);
  };

  return {
    loading,
    error,
    fetchPolkadotJs,
  };
};
