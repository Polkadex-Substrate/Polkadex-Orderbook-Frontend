import * as S from "./styles";

import { Popup } from "@polkadex/orderbook/file-to-delete/ui/molecules/Popup";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Portal } from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/Portal";

export const TemporaryMessage = ({ isVisible, onClose, message }) => {
  return (
    <Portal>
      <Popup isMessage isVisible={isVisible} onClose={onClose} isBottomPosition size="full">
        <S.Main>
          <p>
            <strong> Disclaimer</strong>: {message}
          </p>
          <button type="button" onClick={onClose}>
            <Icons.Close />
          </button>
        </S.Main>
      </Popup>
    </Portal>
  );
};
