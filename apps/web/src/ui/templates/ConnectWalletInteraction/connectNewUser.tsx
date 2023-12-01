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
              onContinue={() => setContinueAction(true)}
              onReadMore={() => {}}
              onBack={() => onNext("Connect")}
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <NewTradingAccount
              key="NewTradingAccount"
              onClose={() => setContinueAction(false)}
              onAction={() => props?.onPage("ProcessingTransaction")}
            />
            <InsufficientBalance
              key="InsufficientBalance"
              onClose={() => setContinueAction(false)}
              onTryAgain={() => props?.onPage("NewTradingAccount")}
            />
            <ProcessingTransaction
              key="ProcessingTransaction"
              logo="POLKADOTJS"
              onAction={async () =>
                await new Promise((resolve) => resolve(console.log("Success")))
              }
              onError={() => window.alert("Error..")}
              onRedirect={() =>
                setTimeout(
                  () => swithProps?.onPage("TradingAccountSuccessfull"),
                  1500
                )
              }
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
