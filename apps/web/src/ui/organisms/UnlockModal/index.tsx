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
  onError,
}: {
  open: boolean;
  onClose: () => void;
  dispatchAction: () => void;
  onError: (value: string) => void;
  tradingAccountInBrowser?: KeyringPair;
}) => {
  return (
    <Modal isBlur placement="start" open={open} onClose={onClose}>
      <Modal.Body>
        <S.UnlockAccount>
          <S.UnlockButton type="button" onClick={onClose}>
            <Icons.Close />
          </S.UnlockButton>
          <UnlockAccount
            onSubmit={({ password }) => {
              // TODO: Fix types or Handle Error
              if (!tradingAccountInBrowser) return;
              try {
                tradingAccountInBrowser.unlock(password);
                if (!tradingAccountInBrowser?.isLocked) dispatchAction();
              } catch (error) {
                onError(error);
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
