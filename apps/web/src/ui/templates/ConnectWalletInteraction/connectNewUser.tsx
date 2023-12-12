// TODO: REPLACE TESTING PROVIDER
import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";
import { Multistep } from "@polkadex/ux";

import { NewUser } from "../ConnectWallet/newUser";
import { NewTradingAccount } from "../ConnectWallet/newTradingAccount";
import { InsufficientBalance } from "../ConnectWallet/insufficientBalance";

export const ConnectNewUser = ({
  onNext,
}: {
  onClose: () => void;
  onNext: (v: "Connect" | "TradingAccountSuccessfull") => void;
}) => {
  const {
    onResetWallet,
    onResetExtension,
    selectedWallet,
    onRegisterTradeAccount,
    registerStatus,
    registerError,
    selectedExtension,
    walletBalance,
  } = useWalletProvider(); // Testing provider

  const handleCloseInteraction = () => {
    onResetWallet?.();
    onResetExtension?.();
    onNext("Connect");
  };

  return (
    <Multistep.Interactive resetOnUnmount>
      {(props) => (
        <>
          <Multistep.Trigger>
            <NewUser
              onContinue={() =>
                props?.onPage(
                  walletBalance ? "NewTradingAccount" : "InsufficientBalance",
                  true
                )
              }
              onReadMore={() => {}}
              onBack={handleCloseInteraction}
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <NewTradingAccount
              key="NewTradingAccount"
              onCreateAccount={async (e) => await onRegisterTradeAccount?.(e)}
              loading={registerStatus === "loading"}
              fundWalletPresent={!!Object.keys(selectedWallet ?? {})?.length}
              errorTitle="Error"
              errorMessage={(registerError as Error)?.message ?? registerError}
              selectedExtension={selectedExtension}
              balance={walletBalance}
              onCreateCallback={() => onNext("TradingAccountSuccessfull")}
              onClose={() => props?.onChangeInteraction(false)}
            />
            <InsufficientBalance
              key="InsufficientBalance"
              balance={walletBalance}
              onClose={() => props?.onChangeInteraction(false)}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
