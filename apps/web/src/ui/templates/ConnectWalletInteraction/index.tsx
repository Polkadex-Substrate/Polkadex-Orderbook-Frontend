import { Dispatch, SetStateAction } from "react";

import { Modal } from "../Modal";
import { Multistep } from "../Multistep";

import { Connect } from "./connect";
import { ConnectNewUser } from "./connectNewUser";
import { ConnectExistingUser } from "./connectExistingUser";
import { CreatedAccountSuccess } from "./createdAccountSuccess";

export const ConnectWalletInteraction = ({
  open,
  onChange,
}: {
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const onClose = () => onChange(false);

  return (
    <Modal open={open} onOpenChange={onChange}>
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
