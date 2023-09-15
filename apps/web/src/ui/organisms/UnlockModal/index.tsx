import { Modal } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { KeyringPair } from "@polkadot/keyring/types";

import { UnlockAccount } from "../UnlockAccount";

import * as S from "./styles";

export const UnlockModal = ({
  open = false,
  onClose,
  tradingAccountInBrowser,
  dispatchAction,
}: {
  open: boolean;
  onClose: () => void;
  dispatchAction: () => void;
  tradingAccountInBrowser: KeyringPair;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Body>
        <S.UnlockAccount>
          <S.UnlockButton type="button" onClick={onClose}>
            <Icons.Close />
          </S.UnlockButton>
          <UnlockAccount
            onSubmit={({ password }) => {
              try {
                tradingAccountInBrowser.unlock(password);
                if (!tradingAccountInBrowser?.isLocked) dispatchAction();
              } catch (error) {
                alert(error);
              } finally {
                onClose();
              }
            }}
          />
        </S.UnlockAccount>
      </Modal.Body>
    </Modal>
  );
};
