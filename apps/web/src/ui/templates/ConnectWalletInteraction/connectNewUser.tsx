import { ProcessingTransaction } from "@polkadex/ux";

import { Multistep } from "../Multistep";
import { NewUser } from "../ConnectWallet/newUser";
import { NewTradingAccount } from "../ConnectWallet/newTradingAccount";
import { InsufficientBalance } from "../ConnectWallet/insufficientBalance";

export const ConnectNewUser = ({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (v: "Connect" | "TradingAccountSuccessfull") => void;
}) => {
  return (
    <Multistep.Interactive>
      {(props) => (
        <>
          <Multistep.Trigger>
            <NewUser
              onContinue={() => {}}
              onReadMore={() => {}}
              onBack={() => onNext("Connect")}
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <NewTradingAccount
              key="NewTradingAccount"
              onClose={() => {}}
              onAction={async () => {}}
              onRedirect={() => {}}
            />
            <InsufficientBalance
              key="InsufficientBalance"
              onClose={() => {}}
              onTryAgain={() => props?.onPage("NewTradingAccount")}
            />
            <ProcessingTransaction
              key="ProcessingTransaction"
              logo="POLKADOTJS"
              onAction={async () =>
                await new Promise((resolve) => resolve(console.log("Success")))
              }
              onError={() => window.alert("Error..")}
              onRedirect={() => {}}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
