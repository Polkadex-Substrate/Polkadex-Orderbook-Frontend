import { Modal, Multistep } from "@polkadex/ux";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { Connect } from "./connect";
import { ConnectNewUser } from "./connectNewUser";
import { ConnectExistingUser } from "./connectExistingUser";
import { CreatedAccountSuccess } from "./createdAccountSuccess";

export type SwitchKeys =
  | "Connect"
  | "NewUser"
  | "TradingAccountSuccessfull"
  | "ExistingUser";

export const ConnectWalletInteraction = () => {
  const { connectWallet, onToogleConnectWallet } = useSettingsProvider();
  const onClose = () => onToogleConnectWallet(false);

  return (
    <Modal open={!!connectWallet} onOpenChange={onToogleConnectWallet}>
      <Modal.Content>
        <Multistep.Switch>
          {(swithProps) => (
            <>
              <Connect
                key="Connect"
                onClose={onClose}
                onNext={(e) => swithProps?.onPage(e)}
              />
              <ConnectNewUser
                key="NewUser"
                onClose={onClose}
                onNext={(e) => swithProps?.onPage(e)}
              />
              <CreatedAccountSuccess
                key="TradingAccountSuccessfull"
                onClose={onClose}
              />
              <ConnectExistingUser
                key="ExistingUser"
                onClose={onClose}
                onNext={(e) => swithProps?.onPage(e)}
              />
            </>
          )}
        </Multistep.Switch>
      </Modal.Content>
    </Modal>
  );
};
