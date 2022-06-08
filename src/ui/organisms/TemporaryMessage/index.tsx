import * as S from "./styles";

import { Popup, Portal } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

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
